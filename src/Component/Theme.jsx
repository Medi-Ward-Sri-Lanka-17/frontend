import { createTheme } from '@mui/material'

export default function Theme() {
    
    const theme=createTheme({
        palette:{

            mode:"light",

            primary:{
                main:'#243E4F',
                dark:"#142733",
            },
            secondary:{
                main:'#31757E',
            },
            warning:{
                main:'#cb5108',
                light:'#d6690a',
                dark:'#dc770d',
            },
            error:{
                main:'#da312a',
                light:'#da312a',
                dark:'#bb1f1e',
            },
            success:{
                main:'#09E78F',
            },
            background:{
                paper:'#EAFFF1',
                normal:'#FFFFFF',
            },link:{
                main:"#149BDB",
                light:"#34AFD9",
            }

        },
        shape:{
            borderRadius:5
        },

        typography:{
            fontFamily:"sans-serif",
        }
    })
  return theme;
}

