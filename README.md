# diplom

2 этап
 создание бекенд

http://api.diplom-max.ml Cсылка на страницу

Ссылка на страницу  https://api.diplom-max.ml/ 

Этап 2: бэкенд
Первым делом реализуем бэкенд. Обычно так и делают: сначала создают API, а потом фронтенд для него. Так и поступим.
Подготовка
Создайте репозиторий на Github. Затем клонируйте этот репозиторий на свой компьютер:
Дайте репозиторию имя, по которому понятно, что в нём хранится бэкенд. Например: news-explorer-api. Код фронтенда будем писать в другом репозитории.
При создании репозитория поставьте галочку напротив “Initialize this repository with a README“.
Локально создайте ветку для кода первого этапа. Назовите её level-1. Весь код первого этапа пишите в этой ветке.
Добавьте все необходимые инфраструктурные файлы: .gitignore, .editorconfig, .eslintrc. Можете взять эти файлы из проекта Mesto.
Инициализируйте package.json:
Поля name и author заполните на своё усмотрение.
Заполните раздел scripts. В нём должны быть команды dev и start. dev запускает проект в режиме разработки с хот-релоудом, а start — в продакшн-режиме, без хот-релоуда.
Создайте схемы и модели ресурсов API
В проекте две сущности: пользователя и статьи (user и article). Создайте схему и модель для каждой.
Поля схемы user.
email — почта пользователя, по которой он регистрируется. Это обязательное поле, уникальное для каждого пользователя. Также оно должно валидироваться на соответствие схеме электронной почты.
password — хеш пароля. Обязательное поле-строка. Нужно задать поведение по умолчанию, чтобы база данных не возвращала это поле.
name — имя пользователя, например: Александр или Мария. Это обязательное поле-строка от 2 до 30 символов.
Поля схемы article.
keyword — ключевое слово, по которому статью нашли. Обязательное поле-строка.
title — заголовок статьи. Обязательное поле-строка.
text — текст статьи. Обязательное поле-строка.
date — дата статьи. Обязательное поле-строка.
source — источник статьи. Обязательное поле-строка.
link — ссылка на статью. Обязательное поле-строка. Должно быть URL-адресом.
image — ссылка на иллюстрацию к статье. Обязательное поле-строка. Должно быть URL-адресом.
owner — _id пользователя, сохранившего статью. Нужно задать поведение по умолчанию, чтобы база данных не возвращала это поле.
Создайте роуты и контроллеры
В API должны быть 4 роута:
# возвращает информацию о пользователе (email и имя)
GET /users/me

# возвращает все сохранённые пользователем статьи
GET /articles

# создаёт статью с переданными в теле
# keyword, title, text, date, source, link и image
POST /articles

# удаляет сохранённую статью  по _id
DELETE /articles/articleId
Создайте контроллер для каждого роута. Защитите роуты авторизацией: если клиент не прислал JWT, доступ к роутам ему должен быть закрыт.
Реализуйте аутентификацию и авторизацию
В API должно быть ещё два роута: для регистрации и логина:
# создаёт пользователя с переданными в теле
# email, password и name
POST /signup

# проверяет переданные в теле почту и пароль
# и возвращает JWT
POST /signin
Эти два роута защищать авторизацией не нужно.
Реализуйте логгирование
Настройте два лога:
request.log, чтобы хранить информацию о всех запросах к API;
error.log, чтобы хранить информацию об ошибках, которые возвращало API.
Логи должны быть в формате JSON. Файлы логов не должны добавляться в репозиторий.
Деплой
Создайте сервер. Затем установите всё необходимое и разверните на нём API.
Важно реализовать возможность обращаться к API по публичному IP-адресу. Раньше мы обращались к серверу локально — по адресу localhost. Для разработки это нормально, но в продакшн не годится: к вашему localhost можете обратиться только вы. Поэтому сервер нужно где-то разместить.
Мы рекомендуем использовать Яндекс Облако для создания облачного сервера. Оно предоставляет грант для новых пользователей — что-то вроде бесплатного периода. Если вы уже пользовались Яндекс Облаком и входного гранта у вас нет, обратитесь к комьюнити-менеджеру.
Создайте домен и прикрепите его к серверу.
Закрепите за доменом публичный IP-адрес своего сервера. Подойдёт и бесплатный домен.
Критерий готовности: к API можно обратиться по доменному имени.
Выпустите сертификаты и подключите их.
Должна быть возможность обратиться к серверу по https.
Создайте на сервере .env файл.
Добавьте в этот файл переменные окружения:
• NODE_ENV=production;
• JWT_SECRET с секретным ключом для создания и верификации JWT.
.env файл должен храниться только на сервере. В репозитории хранить переменные окружения нельзя — это небезопасно.
В режиме разработки код должен запускаться и работать без этого файла. Задайте условие, чтобы dev-сборка запускалась, когда process.env.NODE_ENV !== 'production'.
Расскажите как найти ваш публичный сервер.
Добавьте в файл README.md домен, по которому можно обратиться к вашему серверу.
Несколько советов
Храните пароль в зашифрованном виде.
Валидируйте данные, которые приходят в теле и параметрах запроса. Если с телом что-то не так, обработка запроса вообще не должна передаваться в контроллер. Клиенту при этом следует вернуть ошибку.
Обрабатывайте ошибки централизованно. В конце файла app.js создайте для этого мидлвэр. При возникновении ошибок, не возвращайте их клиенту. Вместо этого передавайте обработку в централизованный мидлвэр.
Внимательно отнеситесь к статусам ошибок. Вам пригодятся: 200, 201, 400, 401, 404, 500.
Проследите, что у пользователя нет возможности удалять статьи других пользователей.
А как же поиск по новостям?
Займёмся этим позже. Для поиска будем использовать стороннее API, поэтому настроим его вместе с остальным фронтендом. Наше API отвечает только за сохранение статей и авторизацию.
Когда всё сделаете, отправьте ссылку на пул реквест через интерфейс Практикума.
На этом, пожалуй, всё. Прислушайтесь к нашим советам. Это поможет сделать диплом качественно и в срок. Также вы приобретёте смежные навыки. Например: умение оценивать время выполнения задачи.
Старайтесь, пробуйте и ничего не бойтесь: в дипломной работе для вас нет слишком сложных задач. Мы верим, что вы справитесь, и желаем удачи.
Чеклист
Обязательно проверьте работу по чеклисту.
Критерии оценки дипломной работы: https://code.s3.yandex.net/web-developer/static/web-diploma-criteria-v2.0/index.html
Правила написания кода: https://code.s3.yandex.net/web-developer/landings/design-rules/index.html

http://84.201.146.193
json
