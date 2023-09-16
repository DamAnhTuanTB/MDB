
index:
	echo "Hi, I'm a Makefile!"

setup-git-hook:
	mkdir -p .git/hooks
	ln -sf ../../pre-commit .git/hooks/pre-commit
