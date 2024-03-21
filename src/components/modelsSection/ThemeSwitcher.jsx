import { useEffect, useState } from "react"

export default function ThemeSwitcher(){
    const[theme,setTheme]=useState(localStorage.theme||"light");

    useEffect(()=>{
        const root=window.document.documentElement;
        const body=window.document.body;

        root.className=theme;
        body.className=theme
        console.log(theme)
    },[theme])
    const toggleDarkMode=(e)=>{
        e.stopPropagation();
        setTheme((prevTheme)=>{
           const newTheme = prevTheme === "light"?"dark":"light";
            return newTheme;
        })
    }
    return(
        <>
        <div className="flex justify-between py-1 px-3 hover:bg-zinc-100 dark:hover:bg-zinc-700" onClick={toggleDarkMode}>
            <div>Dark Mode</div>
            {theme==="dark"?
            (<div className="text-xs rounded-3xl bg-blue-700 text-blue-200 px-2 flex justify-center items-center" ><div>ON</div></div>):
            (<div className="text-xs rounded-3xl bg-slate-300 px-2 flex justify-center items-center"><div>OFF</div></div>)
            }                                                       
        </div>
        </>
    )
}