from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import mysql.connector

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"],

)



def execute_query(query, values=None):
    connection = mysql.connector.connect(user='root', password='root', host="127.0.0.1", port="3306", database='category_database')
    print("DB connected")
    cursor = connection.cursor()
    if values:
        cursor.execute(query, values)
    else:
        cursor.execute(query)
    result = cursor.fetchall() 
    connection.commit()
    cursor.close()
    connection.close()
    return result


class Category(BaseModel):
    name: str
class CategoryIdInput(BaseModel):
    id: int


@app.post("/categories/")
async def add_category(category: Category):
    query = "INSERT INTO categories (name) VALUES (%s)"
    execute_query(query, (category.name,))
    return {"message": "Category added successfully"}


@app.delete("/categories/")
async def delete_category(category_id_input: CategoryIdInput):
    id = category_id_input.id
    if not execute_query("SELECT id FROM categories WHERE id = %s", (id,)):
        raise HTTPException(status_code=404, detail="Category not found")
    
    query = "DELETE FROM categories WHERE id = %s"
    execute_query(query, (id,))
    return {"message": "Category deleted successfully"}


@app.get("/categories/")
async def get_all_categories():
    query = "SELECT name FROM categories"
    result = execute_query(query)
    categories = [row[0] for row in result]
    return categories

@app.get("/categories/get")
async def get_category_by_id(category_id_input: CategoryIdInput):
    id = category_id_input.id
    
    query = "SELECT id, name FROM categories WHERE id = %s"
    result = execute_query(query, (id,))
    if not result:
        raise HTTPException(status_code=404, detail="Category not found")
    
    category = {"id": result[0][0], "name": result[0][1]}
    return category




##########################################################################################################

# class CategoryWithID(BaseModel):
#     id: int

# @app.get("/categories/products")
# async def get_products_in_category(category_id_input: CategoryWithID):
#     id = category_id_input.id

#     if not execute_query("SELECT id FROM categories WHERE id = %s", (id,)):
#         raise HTTPException(status_code=404, detail="Category not found")

#     query = "SELECT id, name , price FROM products WHERE category_id = %s"
#     result = execute_query(query, (id,))
    
#     products = [{"id": row[0], "name": row[1]} for row in result]
#     return products

