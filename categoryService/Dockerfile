FROM python:3.9-slim

WORKDIR /app

RUN pip install --no-cache-dir fastapi uvicorn
RUN pip install mysql-connector-python
#RUN uvicorn main:app --reload --port 5003

COPY main.py ./

EXPOSE 5003

# # Define environment variable
# ENV MODULE_NAME="main"
# ENV VARIABLE_NAME="app"

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5003", "--reload"]
