# EduTopicManager
Короче переходишь в папку backend

там создаёшь и активируешь виртуальное окружение

py -m venv venv (если не сработает с 'py' пиши python или у гпт спроси)
Source venv/Scripts/activate

далее апгрейдишь пип
py -m pip install --upgrade pip

устанавливаешь зависимости

py -m pip install -r requirements.txt

создаёшь и применяешь миграции

py manage.py makemigrations
py manage.py migrate

и стартуешь сервак

py manage.py runserver


если понадобится создаёшь суперюзера
py manage.py createsuperuser


