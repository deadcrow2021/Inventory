from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.background import BackgroundTasks
from redis_om import get_redis_connection, HashModel
from starlette.requests import Request
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_methods=['*'],
    allow_headers=['*'],
)

# connect another database
redis = get_redis_connection(
    host='redis-10710.c293.eu-central-1-1.ec2.cloud.redislabs.com',
    port=10710,
    password='2vYWtiTmNW7vYM6p2Q7o8g8GWRM7fbuP',
    decode_responses=True
)

class Order(HashModel):
    product_id: str
    price: float
    fee: float
    total: float
    quantity: int
    status: str # pending, completed, refunded
    
    class Meta:
        database = redis


@app.get("/orders/{pk}")
def get(pk: str):
    return Order.get(pk)


@app.get("/orders")
def all():
    return [format(pk) for pk in Order.all_pks()]


def format(pk: str):
    order = Order.get(pk)

    return {
        'product_id': order.product_id,
        'price': order.price,
        'fee': order.fee,
        'total': order.total,
        'quantity': order.quantity,
        'status': order.status,
    }


@app.post('/orders')
async def create(request: Request, background_tasks: BackgroundTasks): # id, quantity
    body = await request.json()
    req = requests.get(f'http://localhost:8000/products/{body["id"]}')
    product = req.json()
    
    order = Order(
        product_id = body['id'],
        price = product['price'],
        fee = product['price'] * 0.2,
        total = product['price'] * 1.2,
        quantity = body['quantity'],
        status = 'pending',
    )
    order.save()
    
    background_tasks.add_task(order_completed, order)
    
    return order


def order_completed(order: Order):
    order.status = 'completed'
    order.save()