# ProfileRender

| Параметр | Информация                              | Дефолт |
|:--------:|:----------------------------------------|:------:|
|    bg    | Цвет заднего фона                       | 555555 |
|    c     | Цвет текста                             | FFFFFF |
|    w     | Ширина (в пикселях)                     |        |
|    h     | Высота (в пикселях)                     |        |
|    lh    | Растояние между строками (в пикселях)   |        |
|   pad    | Растояние между содержимым (в пикселях) |   30   |
|    ml    | Сколько максимум отображать линий?      |  100   |
|    fs    | Размер шрифта (в пикселях)              |   12   |

``https://profile-render-fawn.vercel.app/``

![](https://profile-render-fawn.vercel.app/)

``https://profile-render-fawn.vercel.app/?type=text``

![](https://profile-render-fawn.vercel.app/?type=text)

``https://profile-render-fawn.vercel.app/?bg=FF0000&type=text``

![](https://profile-render-fawn.vercel.app/?bg=FF0000&type=text)

``https://profile-render-fawn.vercel.app/?c=000000&type=text``

![](https://profile-render-fawn.vercel.app/?c=000000&type=text)

``https://profile-render-fawn.vercel.app/?pad=0&type=text``

![](https://profile-render-fawn.vercel.app/?pad=0&type=text)

``https://profile-render-fawn.vercel.app/?pad=100&type=text``

![](https://profile-render-fawn.vercel.app/?pad=100&type=text)

``https://profile-render-fawn.vercel.app/?w=150&h=150&type=text``

![](https://profile-render-fawn.vercel.app/?w=150&h=150&type=text)

``https://profile-render-fawn.vercel.app/?fs=50&type=text``

![](https://profile-render-fawn.vercel.app/?fs=50&type=text)

# Типы

## text

| Параметр | Информация                          |      Дефолт      |
|:--------:|:------------------------------------|:----------------:|
|   text   | Текст ("nbsp;" заменяется на побел) | Не указан "text" |

``https://profile-render-fawn.vercel.app/?type=text&text=Hellonbsp;world!``

![](https://profile-render-fawn.vercel.app/?type=text&text=Hellonbsp;world!)

## js

| Параметр | Информация                                                                                     |                        Дефолт                        |
|:--------:|:-----------------------------------------------------------------------------------------------|:----------------------------------------------------:|
|   code   | JS код в формате Base64, что-бы вернуть результат нужно писать "Result = ..." (строка или svg) | UmVzdWx0ID0gItCd0LUg0YPQutCw0LfQsNC9IFwiY29kZVwiIg== |

``https://profile-render-fawn.vercel.app/?type=js``

![](https://profile-render-fawn.vercel.app/?type=js)

``https://profile-render-fawn.vercel.app/?type=js&code=UmVzdWx0ID0gItCS0YDQtdC80Y8gVVRDOiAiICsgbmV3IERhdGUoKS50b0lTT1N0cmluZygpOw==``

![](https://profile-render-fawn.vercel.app/?type=js&code=UmVzdWx0ID0gItCS0YDQtdC80Y8gVVRDOiAiICsgbmV3IERhdGUoKS50b0lTT1N0cmluZygpOw==)