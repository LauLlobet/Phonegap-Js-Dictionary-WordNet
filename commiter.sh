

BRANCH=$(sed -n 's/.*\[\(.*\)\][ ]*\<=====.*/\1/p' ./wikilexitree/data/LexiTree.wiki)
read -p "Current branch: $BRANCH [OK?]"

#TASKS=$(sed -n 's/\-\(.*\)/\1/p' ./wikilexitree/data/$BRANCH.wiki)
TASKS=$(cat ./wikilexitree/data/$BRANCH.wiki)

old=$IFS
IFS='-'
tokens=( $TASKS )
TASK=${tokens[1]};
IFS=$old

NUMS=$(sed -n 's/\*DONE c:\([0-9][0-9]*\).*/\1/p' ./wikilexitree/data/$BRANCH.wiki)

old=$IFS
IFS='
'
tokens=( $NUMS )
#NUMSA=${tokens[1]};
LAST_NUM=${tokens[${#tokens[@]} - 1]}
IFS=$old



LAST_NUM=$(($LAST_NUM + 1))

MSG=$(echo "$BRANCH [$LAST_NUM] $TASK")

MSGP=$(echo -e "$BRANCH [$LAST_NUM]\n $TASK")


read -p "Current task: $MSGP"


cp  ./lexitree/assets/new_lexitree*.db ~/development/altres/ 
git add -A;
git commit -m "$MSG"; 
touch /Users/laullobetpayas/git/lexitree/ioslexitree/DictioTest/Resources/test.db; 
cp ~/development/altres/new_lexitree*.db  /Users/laullobetpayas/git/lexitree/lexitree/assets/ ; 
git push origin

read -p "SAVE task? [OK?]"

sed -e "1,/\(\-\)/s/\(\-\)/c:$LAST_NUM/" <./wikilexitree/data/$BRANCH.wiki > ./wikilexitree/data/tmp.$BRANCH.wiki

cp ./wikilexitree/data/tmp.$BRANCH.wiki ./wikilexitree/data/$BRANCH.wiki


sed -e "s/c:$LAST_NUM.*/\*DONE &\*/" <./wikilexitree/data/$BRANCH.wiki > ./wikilexitree/data/tmp.$BRANCH.wiki

cp ./wikilexitree/data/tmp.$BRANCH.wiki ./wikilexitree/data/$BRANCH.wiki

rm ./wikilexitree/data/tmp.$BRANCH.wiki

open /Applications/restartwikidpad.app
