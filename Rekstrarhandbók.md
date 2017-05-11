# Rekstrarhandbók

## Sækja forritið
Forritið er geymt á GitHub í opnu repository og aðgengilegt [hér]  
(https://github.com/Fingrafimi/Fingrafimi/)  

Afritaðu (Fork) repository-ið á þinn aðgang.
 
Búðu til afrit af repository-inu á vélina sem þú ert að vinna á (e.create local copy).
```shell
git clone https://github.com/Fingrafimi/Fingrafimi.git
```
## Local Server
Settu í gang local server sem er tengdur við möppuna "Fingrafimi".
Ef þú er ekki með local server á tölvunni þinni þá er hægt að forrit sem bjóða upp á þann stuðning hér:

MAC - (https://www.mamp.info/en/)

Windows - (http://wampserver.aviatechno.net)

## Keyra forritið
Eftir að hafa kveikt á servernum finndu á hvaða port-i serverinn (dæmi 8888).
Opnaðu vafra að eigin vali of farðu inn localhost:port
```shell
localhost:8888
```
## Loka forritinu
Til að loka forritinu lokaðu þá glugganum/tab-inu sem forritið var opnað á.
Æskilegt er að slökkva á servernum þegar vinnsla í forritinu er hætt.

## Gera nýja útgáfu
Ný útgáfa verður til um leið og push-að er á master branch.

Til að vista breytingar
```shell
git add <file>
```
eða til að vista allar breytingar
```shell
git add .
```

Commita breytingum
```shell
git commit -m "lýsing fyrir breytingarnar"
```
Push-a breytingum á master branch
```shell
git push origin master
```
Ný útgáfa ætti að byrstast innan skamms [hér]
(http://fingrafimi.herokuapp.com/)

