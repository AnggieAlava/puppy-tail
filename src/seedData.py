import click 
from api.models import seed
from app import app


@click.command
@click.option("--file", '-f', required=True, help='Json file to load.')
def load_data(file):
    try:
        with app.app_context():
            seed(file)
        print('Data cargada exitosamente. Yay \o/ !!')
    except Exception as err:
        print(f'Algo salio mal, detalles del error: {err}.')

if __name__ == "__main__":
    load_data()