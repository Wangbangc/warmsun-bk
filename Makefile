build: 
	npm run docs:build
	
	buildctl \
	--addr tcp://buildkitd.cicd.svc.cluster.local:1234 \
	build \
	--frontend dockerfile.v0 \
	--local context=.vitepress \
	--local dockerfile=.vitepress \
	--output type=image,name=hb.apihub.net/feling.net/pages:1.0.0,push=true