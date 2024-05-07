from sqlalchemy import Boolean,Integer,String,Column
from database import Base

class User(Base):
    
    __tablename__ ='users'
    id=Column(Integer,primary_key=True,index=True)
    username= Column(String(50),unique=True)

class Order(Base):

    __tablename__ ='orders'
    id=Column(Integer,primary_key=True,index=True)
    product_name=Column(String(10))
    num_of_product=Column(Integer)
    user_id=Column(Integer)
