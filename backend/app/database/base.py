from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


# this is bellow the class base because first the user imports base then we import user here
# from app.database.models import User, Content