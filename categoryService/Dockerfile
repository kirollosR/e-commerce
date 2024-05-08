# FROM python:3.9-slim

# WORKDIR /app

# RUN pip install --no-cache-dir fastapi uvicorn
# RUN pip install mysql-connector-python
# #RUN uvicorn main:app --reload --port 5003

# COPY main.py ./

# EXPOSE 5003


# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5003", "--reload"]


# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.9

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt
RUN pip install mysql
RUN pip install fastapi uvicorn mysql-connector-python
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 
COPY ./main.py /code/

EXPOSE 5003

# 
CMD ["fastapi", "run", "main.py", "--port", "5003"]