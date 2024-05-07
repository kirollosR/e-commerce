from fastapi import FastAPI,HTTPException,Depends,status
from pydantic import BaseModel
# from typing import Annotated
# annotated=Annotated
import models
from database import engine,SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

class OrderBase(BaseModel):
    product_name :str
    num_of_product:int
    user_id:int

class UserBase(BaseModel):
    username:str

def get_db():

    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()
    
db_dependency=Depends(get_db)

####    Users APIs  ####

@app.post("/users/",status_code=status.HTTP_201_CREATED)
async def create_user(user:UserBase ,db: Session = db_dependency):
    db_user=models.User(**user.dict())
    db.add(db_user)
    db.commit()

@app.get("/users/{user_id}",status_code=status.HTTP_200_OK)
async def read_user(user_id:int,db:Session=db_dependency):
    user=db.query(models.User).filter(models.User.id==user_id).first()
    if user is None:
        raise HTTPException( status_code=404,detail="user not found")
    return user 

####    Users APIs  ####

####    Orders APIs ####
@app.post("/order/",status_code=status.HTTP_201_CREATED)
async def create_order(order:OrderBase, db:Session=db_dependency):
    db_order=models.Order(**order.dict())
    db.add(db_order)
    db.commit()

@app.delete("/order/{order_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_order(order_id: int, db: Session = Depends(get_db)):
    # Retrieve the order by order_id
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")

    # Delete the order from the database
    db.delete(db_order)
    db.commit()

    # Return 204 (No Content) response
    return None


@app.get("/orders/{user_id}", status_code=status.HTTP_200_OK)
async def get_orders(user_id:str, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Fetch all orders for the user
    orders = db.query(models.Order).filter(models.Order.user_id == db_user.id).all()
    
    return orders
####    Orders APIs ####
