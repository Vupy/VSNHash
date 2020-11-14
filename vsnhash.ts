class VshHash{
    constructor(){}

    make_hash(text: string, salt: string = 'vsninc', capo: string = '') : string {
        let out: string = '';
        let s: number = 0;
        let sal: string;
        let numbers: Array<number> = [2, 3, 5, 7];
        let x: number;

        if (capo != ''){
            x = parseInt(capo[0])
            sal = this.gen_salt(salt, capo[1])
        }

        else{
            x = numbers[Math.floor(Math.random() * numbers.length)]
            sal = this.gen_salt(salt)
        }

        const keywork: number = parseInt(sal[1]) + parseInt(sal[sal.length - 1])

        for (const i of salt){
            s += (i.charCodeAt(0) + 2) >> 1
        }

        for (const i of text){
            let n: number = (Math.pow(i.charCodeAt(0), 2) << 2) + 2 + s
            n = n >> x
            out += (n + keywork).toString(16)
        }
        
        out = ((parseInt(out, 16) << 1) * 13 + 3).toString(16)
        
        return `${sal}.${x}${out}`
    }

    gen_salt(salt: string, capo: string = '') : string {
        const x: number = capo ? parseInt(capo) : Math.floor(Math.random() * 7) + 1;
        
        let n: string = "";
        let l: number = salt.length;

        for (const i of salt){
            n += ((i.charCodeAt(0) + 19 - l) >> x).toString(16)
        }

        return `${x}${parseInt(n, 16)}`
    }

    verify(hash : string, word : string, salt : string = 'vsninc') : boolean{
        const capos: string = hash.split('.')[1][0] + hash[0]
        const has: string = this.make_hash(word, salt, capos)

        console.log(hash, has);
        
        return hash == has
    }
}

export default VshHash