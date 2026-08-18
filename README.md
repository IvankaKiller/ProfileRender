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

``https://profile-render-fawn.vercel.app/?lh=5&type=text&text=1\n2\n3\n4\n5``

![](https://profile-render-fawn.vercel.app/?lh=5&type=text&text=1\n2\n3\n4\n5)

``https://profile-render-fawn.vercel.app/?lh=50&type=text&text=1\n2\n3\n4\n5``

![](https://profile-render-fawn.vercel.app/?lh=50&type=text&text=1\n2\n3\n4\n5)

``https://profile-render-fawn.vercel.app/?ml=2&type=text&text=1\n2\n3\n4\n5``

![](https://profile-render-fawn.vercel.app/?ml=2&type=text&text=1\n2\n3\n4\n5)

# Типы

## text

| Параметр | Информация                         |      Дефолт      |
|:--------:|:-----------------------------------|:----------------:|
|   text   | Текст ("nbsp" заменяется на побел) | Не указан "text" |

``https://profile-render-fawn.vercel.app/?type=text&text=Hellonbspworld!``

![](https://profile-render-fawn.vercel.app/?type=text&text=Hellonbspworld!)

``https://profile-render-fawn.vercel.app/?type=text&text=New\nLine``

![](https://profile-render-fawn.vercel.app/?type=text&text=New\nLine)

``https://profile-render-fawn.vercel.app/?type=text&text=1\n2\n3\n4\n5\n6\n7\n8\n9``

![](https://profile-render-fawn.vercel.app/?type=text&text=1\n2\n3\n4\n5\n6\n7\n8\n9)

``https://profile-render-fawn.vercel.app/?type=text&text=Приветnbspмир!``

![](https://profile-render-fawn.vercel.app/?type=text&text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82nbsp%D0%BC%D0%B8%D1%80!)

``https://profile-render-fawn.vercel.app/?type=text&text=Эмодзиnbsp->nbsp🙄``

![](https://profile-render-fawn.vercel.app/?type=text&text=%D0%AD%D0%BC%D0%BE%D0%B4%D0%B7%D0%B8nbsp-%3Enbsp%F0%9F%99%84)

## js

| Параметр | Информация                                                                                     |                        Дефолт                        |
|:--------:|:-----------------------------------------------------------------------------------------------|:----------------------------------------------------:|
|   code   | JS код в формате Base64, что-бы вернуть результат нужно писать "Result = ..." (строка или svg) | UmVzdWx0ID0gItCd0LUg0YPQutCw0LfQsNC9IFwiY29kZVwiIg== |

``https://profile-render-fawn.vercel.app/?type=js``

![](https://profile-render-fawn.vercel.app/?type=js)

``https://profile-render-fawn.vercel.app/?type=js&code=UmVzdWx0ID0gItCS0YDQtdC80Y8gVVRDOiAiICsgbmV3IERhdGUoKS50b0lTT1N0cmluZygpOw==``

![](https://profile-render-fawn.vercel.app/?type=js&code=UmVzdWx0ID0gItCS0YDQtdC80Y8gVVRDOiAiICsgbmV3IERhdGUoKS50b0lTT1N0cmluZygpOw==)

``https://profile-render-fawn.vercel.app/?type=js&code=UmVzdWx0ID0gYDxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDUwMCAxMjAiPg0KICA8ZGVmcz4NCiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImNvb2xHcmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIwJSI+DQogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDBkMmZmOyI+DQogICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InN0b3AtY29sb3IiIHZhbHVlcz0iIzAwZDJmZjsjOTI4ZGFiOyNlZTA5Nzk7IzAwZDJmZiIgZHVyPSI1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+DQogICAgICA8L3N0b3A+DQogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlZTA5Nzk7Ij4NCiAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ic3RvcC1jb2xvciIgdmFsdWVzPSIjZWUwOTc5OyMwMGQyZmY7IzkyOGRhYjsjZWUwOTc5IiBkdXI9IjVzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4NCiAgICAgIDwvc3RvcD4NCiAgICA8L2xpbmVhckdyYWRpZW50Pg0KICA8L2RlZnM+DQoNCiAgPGc+DQogICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJ0cmFuc2xhdGUiIHZhbHVlcz0iMCA1OyAwIC01OyAwIDUiIGR1cj0iM3MiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPg0KDQogICAgPHRleHQgeD0iNTAlIiB5PSI3NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjUwIiBmaWxsPSIjMDAwIiBvcGFjaXR5PSIwLjMiPg0KICAgICAgUHJvZmlsZSBSZW5kZXINCiAgICA8L3RleHQ+DQogICAgDQogICAgPHRleHQgeD0iNTAlIiB5PSI3MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjUwIiBmaWxsPSIjNDQ0Ij4NCiAgICAgIFByb2ZpbGUgUmVuZGVyDQogICAgPC90ZXh0Pg0KDQogICAgPHRleHQgeD0iNTAlIiB5PSI3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjUwIiBmaWxsPSJ1cmwoI2Nvb2xHcmFkKSI+DQogICAgICBQcm9maWxlIFJlbmRlcg0KICAgIDwvdGV4dD4NCiAgPC9nPg0KPC9zdmc+YA==``

![](https://profile-render-fawn.vercel.app/?type=js&code=UmVzdWx0ID0gYDxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDUwMCAxMjAiPg0KICA8ZGVmcz4NCiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImNvb2xHcmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIwJSI+DQogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDBkMmZmOyI+DQogICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InN0b3AtY29sb3IiIHZhbHVlcz0iIzAwZDJmZjsjOTI4ZGFiOyNlZTA5Nzk7IzAwZDJmZiIgZHVyPSI1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+DQogICAgICA8L3N0b3A+DQogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlZTA5Nzk7Ij4NCiAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ic3RvcC1jb2xvciIgdmFsdWVzPSIjZWUwOTc5OyMwMGQyZmY7IzkyOGRhYjsjZWUwOTc5IiBkdXI9IjVzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4NCiAgICAgIDwvc3RvcD4NCiAgICA8L2xpbmVhckdyYWRpZW50Pg0KICA8L2RlZnM+DQoNCiAgPGc+DQogICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJ0cmFuc2xhdGUiIHZhbHVlcz0iMCA1OyAwIC01OyAwIDUiIGR1cj0iM3MiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPg0KDQogICAgPHRleHQgeD0iNTAlIiB5PSI3NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjUwIiBmaWxsPSIjMDAwIiBvcGFjaXR5PSIwLjMiPg0KICAgICAgUHJvZmlsZSBSZW5kZXINCiAgICA8L3RleHQ+DQogICAgDQogICAgPHRleHQgeD0iNTAlIiB5PSI3MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjUwIiBmaWxsPSIjNDQ0Ij4NCiAgICAgIFByb2ZpbGUgUmVuZGVyDQogICAgPC90ZXh0Pg0KDQogICAgPHRleHQgeD0iNTAlIiB5PSI3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjUwIiBmaWxsPSJ1cmwoI2Nvb2xHcmFkKSI+DQogICAgICBQcm9maWxlIFJlbmRlcg0KICAgIDwvdGV4dD4NCiAgPC9nPg0KPC9zdmc+YA==)

``https://profile-render-fawn.vercel.app/?type=js&code=dGhyb3cgbmV3IEVycm9yKCLQn9GA0LjQvNC10YAg0L7RiNC40LHQutC4Iik=``

![](https://profile-render-fawn.vercel.app/?type=js&code=dGhyb3cgbmV3IEVycm9yKCLQn9GA0LjQvNC10YAg0L7RiNC40LHQutC4Iik=)

## icons

| Параметр | Информация                 | Дефолт |
|:--------:|:---------------------------|:------:|
|  icons   | Список отображаемых иконок |        |

### Доступные иконки

|  Название  |                   ID                   | Иконка                                                                                      |
|:----------:|:--------------------------------------:|:--------------------------------------------------------------------------------------------|
|   Пустая   |                `blank`                 | ![](https://github.com/Woowz11/ProfileRender/raw/refs/heads/main/resources/icons/blank.svg) |
|   Ошибка   |                `error`                 | ![](https://github.com/Woowz11/ProfileRender/raw/refs/heads/main/resources/icons/error.svg) |
|     C      |              `c`, `clang`              | ![](https://github.com/Woowz11/ProfileRender/raw/refs/heads/main/resources/icons/c.svg)     |
|    C++     |           `cpp`, `cplusplus`           | ![](https://github.com/Woowz11/ProfileRender/raw/refs/heads/main/resources/icons/cpp.svg)   |
|     C#     |             `cs`, `csharp`             | ![](https://github.com/Woowz11/ProfileRender/raw/refs/heads/main/resources/icons/cs.svg)    |
|    C--     |          `cmm`, `cminusminus`          | ![](https://github.com/Woowz11/ProfileRender/raw/refs/heads/main/resources/icons/cmm.svg)   |
|   Python   |             `py`, `python`             | ![](https://github.com/Woowz11/ProfileRender/raw/refs/heads/main/resources/icons/py.svg)    |
|    HTML    |                 `html`                 | ![](https://github.com/Woowz11/ProfileRender/raw/refs/heads/main/resources/icons/html.svg)  |
|    CSS     |                 `css`                  | ![](https://github.com/Woowz11/ProfileRender/raw/refs/heads/main/resources/icons/css.svg)   |
| JavaScript |           `js`, `javascript`           | ![](https://github.com/Woowz11/ProfileRender/raw/refs/heads/main/resources/icons/js.svg)    |
| TypeScript |           `ts`, `typecript`            | ![](https://github.com/Woowz11/ProfileRender/raw/refs/heads/main/resources/icons/ts.svg)    |
|    Java    |                 `java`                 | ![](https://github.com/Woowz11/ProfileRender/raw/refs/heads/main/resources/icons/java.svg)  |
|    NASM    |                 `nasm`                 | ![](https://github.com/Woowz11/ProfileRender/raw/refs/heads/main/resources/icons/nasm.svg)  |
|    WASM    |                 `wasm`                 | ![](https://github.com/Woowz11/ProfileRender/raw/refs/heads/main/resources/icons/wasm.svg)  |
| Windows 11 |          `win11`, `windows11`          | ![](https://github.com/Woowz11/ProfileRender/raw/refs/heads/main/resources/icons/win11.svg) |
| Windows 10 | `win10`, `windows10`, `win`, `windows` | ![](https://github.com/Woowz11/ProfileRender/raw/refs/heads/main/resources/icons/win10.svg) |
| Windows 8  |           `win8`, `windows8`           | ![](https://github.com/Woowz11/ProfileRender/raw/refs/heads/main/resources/icons/win8.svg)  |
| Windows 7  |           `win7`, `windows7`           | ![](https://github.com/Woowz11/ProfileRender/raw/refs/heads/main/resources/icons/win7.svg)  |
| Windows XP |          `winxp`, `windowsxp`          | ![](https://github.com/Woowz11/ProfileRender/raw/refs/heads/main/resources/icons/winxp.svg) |

``https://profile-render-fawn.vercel.app/?type=icons``

![](https://profile-render-fawn.vercel.app/?type=icons)

``https://profile-render-fawn.vercel.app/?type=icons&icons=c,cpp,cs,cmm``

![](https://profile-render-fawn.vercel.app/?type=icons&icons=c,cpp,cs)

``https://profile-render-fawn.vercel.app/?type=icons&icons=python,not_existing_icon,js``

![](https://profile-render-fawn.vercel.app/?type=icons&icons=python,not_existing_icon,js)