str="'$*'"

str=$(gitmoji $str)

b=$(git commit -m "$str")

