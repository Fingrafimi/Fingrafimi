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

## Running the program
Eftir að hafa kveikt á servernum finndu á hvaða port-i serverinn (dæmi 8888).
Opnaðu vafra að eigin vali of farðu inn localhost:port
```shell
localhost:8888
```

## Closing the program
While the program is running, press Ctrl-C to close the program.

## Deploying the program
Change to the project root directory and run the deploy script.

```shell
cd TicTacToe
bash bin/deploy
```
