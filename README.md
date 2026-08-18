# ProfileRender

бла бла бла, бле бле бле, блу блу блу

| Параметр | Информация          | Пример |
|:--------:|:--------------------|:------:|
|    bg    | Цвет заднего фона   | 555555 |
|  color   | Цвет текста         | FFFFFF |
|    w     | Ширина (в пикселях) |  650   |
|    h     | Высота (в пикселях) |  400   |

# Типы

## text

| Параметр | Информация                          |    Пример    |
|:--------:|:------------------------------------|:------------:|
|   text   | Текст ("nbsp;" заменяется на побел) | Hello_world! |

![](https://profile-render-fawn.vercel.app/?type=text&text=Hello_world!)

## js

| Параметр | Информация                                                                                     |                                    Пример                                    |
|:--------:|:-----------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------:|
|  code*   | JS код в формате Base64, что-бы вернуть результат нужно писать "Result = ..." (строка или svg) | UmVzdWx0ID0gItCS0YDQtdC80Y8gVVRDOiAiICsgbmV3IERhdGUoKS50b0lTT1N0cmluZygpOw== |

![](https://profile-render-fawn.vercel.app/?type=js&code=UmVzdWx0ID0gItCS0YDQtdC80Y8gVVRDOiAiICsgbmV3IERhdGUoKS50b0lTT1N0cmluZygpOw==)