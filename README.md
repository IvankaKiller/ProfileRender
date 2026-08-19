# ProfileRender

### Применяется ко всем типам (только для текста simple)

| Параметр  | Информация                              | Дефолт |
|:---------:|:----------------------------------------|:------:|
|   t_bg    | Цвет заднего фона                       | 555555 |
|  t_c      | Цвет текста                             | FFFFFF |
|    t_w    | Ширина (в пикселях)                     |        |
|    t_h    | Высота (в пикселях)                     |        |
|   t_lh    | Растояние между строками (в пикселях)   |        |
|   t_pad   | Растояние между содержимым (в пикселях) |   30   |
|   t_ml    | Сколько максимум отображать линий?      |  100   |
|   t_fs    | Размер шрифта (в пикселях)              |   12   |

``https://profile-render-fawn.vercel.app/``

![](https://profile-render-fawn.vercel.app/)

``https://profile-render-fawn.vercel.app/?type=simple``

![](https://profile-render-fawn.vercel.app/?type=simple)

``https://profile-render-fawn.vercel.app/?t_bg=FF0000&type=simple``

![](https://profile-render-fawn.vercel.app/?t_bg=FF0000&type=simple)

``https://profile-render-fawn.vercel.app/?t_c=000000&type=simple``

![](https://profile-render-fawn.vercel.app/?t_c=000000&type=simple)

``https://profile-render-fawn.vercel.app/?t_pad=0&type=simple``

![](https://profile-render-fawn.vercel.app/?t_pad=0&type=simple)

``https://profile-render-fawn.vercel.app/?t_pad=100&type=simple``

![](https://profile-render-fawn.vercel.app/?t_pad=100&type=simple)

``https://profile-render-fawn.vercel.app/?t_w=150&t_h=150&type=simple``

![](https://profile-render-fawn.vercel.app/?t_w=150&t_h=150&type=simple)

``https://profile-render-fawn.vercel.app/?t_fs=50&type=simple``

![](https://profile-render-fawn.vercel.app/?t_fs=50&type=simple)

``https://profile-render-fawn.vercel.app/?t_lh=5&type=simple&text=1\n2\n3\n4\n5``

![](https://profile-render-fawn.vercel.app/?t_lh=5&type=simple&text=1\n2\n3\n4\n5)

``https://profile-render-fawn.vercel.app/?t_lh=50&type=simple&text=1\n2\n3\n4\n5``

![](https://profile-render-fawn.vercel.app/?t_lh=50&type=simple&text=1\n2\n3\n4\n5)

``https://profile-render-fawn.vercel.app/?t_ml=2&type=simple&text=1\n2\n3\n4\n5``

![](https://profile-render-fawn.vercel.app/?t_ml=2&type=simple&text=1\n2\n3\n4\n5)

# Типы

## notype

``https://profile-render-fawn.vercel.app/?type=notype``

![](https://profile-render-fawn.vercel.app/?type=notype)

## simple

| Параметр | Информация                         |      Дефолт      |
|:--------:|:-----------------------------------|:----------------:|
|   text   | Текст ("nbsp" заменяется на побел) | Не указан "text" |

``https://profile-render-fawn.vercel.app/?type=simple&text=Hellonbspworld!``

![](https://profile-render-fawn.vercel.app/?type=simple&text=Hellonbspworld!)

``https://profile-render-fawn.vercel.app/?type=simple&text=New\nLine``

![](https://profile-render-fawn.vercel.app/?type=simple&text=New\nLine)

``https://profile-render-fawn.vercel.app/?type=simple&text=1\n2\n3\n4\n5\n6\n7\n8\n9``

![](https://profile-render-fawn.vercel.app/?type=simple&text=1\n2\n3\n4\n5\n6\n7\n8\n9)

``https://profile-render-fawn.vercel.app/?type=simple&text=Приветnbspмир!``

![](https://profile-render-fawn.vercel.app/?type=simple&text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82nbsp%D0%BC%D0%B8%D1%80!)

``https://profile-render-fawn.vercel.app/?type=simple&text=Эмодзиnbsp->nbsp🙄``

![](https://profile-render-fawn.vercel.app/?type=simple&text=%D0%AD%D0%BC%D0%BE%D0%B4%D0%B7%D0%B8nbsp-%3Enbsp%F0%9F%99%84)

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

## icon

| Параметр | Информация | Дефолт |
|:--------:|:-----------|:------:|
|   icon   | Иконка     |        |

``https://profile-render-fawn.vercel.app/?type=icon``

![](https://profile-render-fawn.vercel.app/?type=icon)

``https://profile-render-fawn.vercel.app/?type=icon&icon=winxp``

![](https://profile-render-fawn.vercel.app/?type=icon&icon=winxp)

``https://profile-render-fawn.vercel.app/?type=icon&icon=not_existing_icon``

![](https://profile-render-fawn.vercel.app/?type=icon&icon=not_existing_icon)

### Доступные иконки

|        Название         |                         ID                         | Иконка                                                                   |
|:-----------------------:|:--------------------------------------------------:|:-------------------------------------------------------------------------|
|         Пустая          |                      `blank`                       | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=blank)        |
|         Ошибка          |                      `error`                       | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=error)        |
|            C            |                    `c`, `clang`                    | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=c)            |
|           C++           |                 `cpp`, `cplusplus`                 | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=cpp)          |
|           C#            |                   `cs`, `csharp`                   | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=cs)           |
|           C--           |                `cmm`, `cminusminus`                | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=cmm)          |
|         Python          |                   `py`, `python`                   | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=py)           |
|          HTML           |                       `html`                       | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=html)         |
|           CSS           |                       `css`                        | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=css)          |
|       JavaScript        |                 `js`, `javascript`                 | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=js)           |
|       TypeScript        |                 `ts`, `typecript`                  | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=ts)           |
|          Java           |                       `java`                       | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=java)         |
|          NASM           |                       `nasm`                       | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=nasm)         |
|          WASM           |                       `wasm`                       | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=wasm)         |
|       Windows 11        |                `win11`, `windows11`                | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=win11)        |
|       Windows 10        |       `win10`, `windows10`, `win`, `windows`       | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=win10)        |
|        Windows 8        |                 `win8`, `windows8`                 | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=win8)         |
|        Windows 7        |                 `win7`, `windows7`                 | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=win7)         |
|       Windows XP        |                `winxp`, `windowsxp`                | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=winxp)        |
|           Lua           |                       `lua`                        | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=lua)          |
|          Luau           | `luau`, `robloxlua`, `luaroblox`, `rblua`, `luarb` | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=luau)         |
|       Garry's Mod       |          `gmod`, `garrymod`, `garrysmod`           | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=gmod)         |
|     Garry's Mod Lua     |            `glua`, `gmodlua`, `luagmod`            | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=glua)         |
|         Roblox          |                      `roblox`                      | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=roblox)       |
|      Roblox Studio      |            `robloxstudio`, `robloxstd`             | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=robloxstudio) |
|          Rust           |                    `rust`, `rs`                    | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=rs)           |
|         Docker          |                  `docker`, `dock`                  | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=docker)       |
| Microsoft Visual Studio |                       `mvs`                        | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=mvs)          |
|   Visual Studio Code    |                       `vsc`                        | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=vsc)          |
|       SVG Format        |                       `svg`                        | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=svg)          |
|           PHP           |                       `php`                        | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=php)          |
|          Scala          |                   `scala`, `scl`                   | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=scala)        |
|         Kotlin          |                   `kt`, `kotlin`                   | ![](https://profile-render-fawn.vercel.app/?type=icon&icon=kt)           |

## icons

| Параметр | Информация                 | Дефолт |
|:--------:|:---------------------------|:------:|
|  icons   | Список отображаемых иконок |        |

``https://profile-render-fawn.vercel.app/?type=icons``

![](https://profile-render-fawn.vercel.app/?type=icons)

``https://profile-render-fawn.vercel.app/?type=icons&icons=c,cpp,cs,cmm``

![](https://profile-render-fawn.vercel.app/?type=icons&icons=c,cpp,cs)

``https://profile-render-fawn.vercel.app/?type=icons&icons=python,not_existing_icon,js``

![](https://profile-render-fawn.vercel.app/?type=icons&icons=python,not_existing_icon,js)

``https://profile-render-fawn.vercel.app/?type=icons&icons=blank,error,c,cpp,cs,cmm,py,html,css,js,ts,java,nasm,wasm,win11,win,win8,win7,winxp,lua,luau,gmod,glua,roblox,robloxstd,rs,dock,mvs,vsc,svg,php``

![](https://profile-render-fawn.vercel.app/?type=icons&icons=blank,error,c,cpp,cs,cmm,py,html,css,js,ts,java,nasm,wasm,win11,win,win8,win7,winxp,lua,luau,gmod,glua,roblox,robloxstd,rs,dock,mvs,vsc,svg,php)

## debug

| Параметр | Информация    | Дефолт |
|:--------:|:--------------|:------:|
|  debug   | Что дебажить? |        |