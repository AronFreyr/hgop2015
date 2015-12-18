##Day 1

### Grunt
Grunt auðveldar manni að keyra tasks í javascript. Það meðal annars automatar fyrir mann keyrslu á unit tests.

### Bower
Bower sér um javascript pakka sem hafa eitthvað að gera með frammendann.

### Jenkins
Jenkins er Continuous Integration kerfi til að sjálfvirknivæða skriptur sem við höfum skrifað til að testa kerfið.

### npm
Það sér um viðhald og rétta uppsetningu á pökkum fyrir javascript.

### Vagrant
Vagrant sér um uppsetningu á virtual vélum með því að gera það ferli auðveldara heldur en að vinna með þær beint í gegnum VirtualBox. Vagrant leyfir manni að auðveldlega að gera stillingar með hluti einsog ip tölur ports og fleira.

### VirtualBox
VirtualBox leyfir okkur að keyra nokkrar mismunandi virtual vélar herma eftir kerfi sem sett er upp á nokkrar vélar.

### NodeJs
NodeJs er notað í bakenda á vefforitun fyrir javascript.

### JsHint
Er notað í villumeðhöndlun í kóðanum sjálfum en ekki

### q
Þörf er á q þegar það kemur að notkun memory store.

##Day 2

### Topology of the Deployment Pipeline
Nú höfum við skriptu sem leyfir deployment vélinni okkar að ssh-a sig inn í aðra vél fyrir production. Í henni er nýjasta útgáfan af kerfinu sótt af Docker, gamla docker myndin lögð niður og sú nýja sett upp á sjálfvirkann hátt.


## Jenkins Scriptur

alltaf var jenkins gefið þetta workspace: /home/vagrant/src/tictactoe/hgop2015

### Commit scriptan
export DISPLAY=:0
./dockerbuild.sh

### Firefox automatic deployment
export DISPLAY=:0
firefox

### Acceptance scriptan
export ACCEPTANCE_URL=http://127.0.0.1:9000
grunt mochaTest:acceptance
