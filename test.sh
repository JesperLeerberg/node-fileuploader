str="$*"

str=$(gitmoji "$str")

git commit -m "$str"

