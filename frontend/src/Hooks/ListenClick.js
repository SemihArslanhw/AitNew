import { useCallback , useEffect } from "react";

export function useIsOutsideClick(ref  ,func) {
   const isOutside = useCallback((event) => {
    
    if (ref && !ref.current.contains(event.target) && event.target !== document.body && event.target.role !== "option" ) {
        console.log(ref.current , event.target)
        func()
    }else{
        console.log(ref.current , event.target)
    }
    }, [func]);

    useEffect(() => {
     document.addEventListener("click", isOutside);
        return () => {
            document.removeEventListener("click", isOutside);
            }
    }, [ref]);
}