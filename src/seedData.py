import click 
from api.models import seed
from app import app


@click.command
@click.option("--file", '-f', required=True, help='Json file to load.')
def load_data(file):
    with app.app_context():
        seed(file)

if __name__ == "__main__":
    load_data()