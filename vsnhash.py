from random import randint, choice
from math import log


class VsnHash:
    def __init__(self, *args, **kwargs):
        pass


    def make_hash(self, text: str, salt: str = 'vsninc', capo: str = None) -> str:
        out = ''
        s = 0

        if capo:
            x = int(capo[0])
            sal = self.gen_salt(salt, int(capo[1]))

        else:
            x = choice([2, 3, 5, 7])
            sal = self.gen_salt(salt)

        keywork = int(sal[1]) + int(sal[len(sal) - 1])

        for i in salt:
            s += (ord(i) + 2) >> 1

        for i in text:
            n = ((ord(i) ** 2) << 2) + 2 + s
            n = n >> x
            out += hex(n + keywork).replace('0x', '')

        out = hex((int(out, 16) << 1) * 13 + 3).replace('0x', '')

        return f'{sal}.{x}{out}'


    def gen_salt(self, salt: str, capo: int = None) -> str:
        x = capo if capo else randint(1, 7)
        n = ''
        l = len(salt)

        for i in salt:
            n += hex((ord(i) + 19 - l) >> x).replace('0x', '')

        return f'{x}{int(n, 16)}'

    
    def verify(self, hash: str, word: str, salt: str = 'vsninc') -> bool:
        capos = hash.split('.')[1][0] + hash[0]
        has = self.make_hash(word, salt, capos)

        return hash == has


if __name__ == '__main__':
    vsn = VsnHash()
    has = vsn.make_hash("myWord")
    hasSalt = vsn.make_hash("myWord", 'kuma')

    print()
    print(f"Texto entrada: myWord\nTexto saída: {has}\nTexto saída salt: {hasSalt}")
    print(f"\nmyWord == {has}: {vsn.verify(has, 'myWord')}")
    print(f"myWord == {hasSalt}: {vsn.verify(hasSalt, 'myWord', 'kuma')}")

    print() 