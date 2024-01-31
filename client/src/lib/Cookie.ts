
class Cookie {

    static set(name: string, value: string, expireInDays?: number, path?: string, domain?: string)  {
        
        let expires = '';
        if(expireInDays) {
            if(expireInDays > 0) {
                const d = new Date();
                d.setTime(d.getTime() + (expireInDays * 24 * 60 * 60 * 1000));
                expires = 'expires=' + d.toUTCString();
            }
            else if(expireInDays < 0) {
                expires = 'expires=Thu, 01 Jan 1970 00:00:01 GMT';
            }
        }
        document.cookie = name + '=' 
            + ((value) ? value : '')
            + ((path) ? ';path='+path:'')
            + ((domain)?';domain='+domain:'')
            + ';' + expires;
        return value;
    }
    
    static delete(name: string, path?: string, domain?: string) {

        if(this.get(name)) {
            document.cookie = name + '='
                + ((path) ? ';path='+path:'')
                + ((domain)?';domain='+domain:'')
                + ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
            return true;
        }
        return false;
    }
    
    static get(name: string) {

        const cookieName = name + '=';
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i]; 
            while(c.charAt(0) === ' ')
                c = c.substring(1);
            if(c.indexOf(cookieName) === 0)
                return c.substring(cookieName.length, c.length); 
        } 
        return undefined; 
    }
}


export default Cookie;
