IMAGE=us-central1-docker.pkg.dev/my-docker-project-12345/my-repo/password-generator
TAG_FILE=.last_tag

# קורא את הטאג האחרון או מתחיל מ-0 אם לא קיים
LAST_TAG=$(shell if [ -f $(TAG_FILE) ]; then cat $(TAG_FILE); else echo 0; fi)
# TAG הבא יהיה LAST_TAG + 1
NEXT_TAG=$(shell echo $$(($(LAST_TAG)+1)))

PLATFORMS=linux/amd64,linux/arm64

build:
	docker buildx build \
		--platform ${PLATFORMS} \
		-t ${IMAGE}:${NEXT_TAG} \
		--push \
		.
	@echo ${NEXT_TAG} > $(TAG_FILE)
	@echo "Built multi-platform image with tag: ${NEXT_TAG}"


run:
	docker run -p 8080:80 ${IMAGE}:$(shell cat $(TAG_FILE))

push:
	docker push ${IMAGE}:$(shell cat $(TAG_FILE))
deploy:
	gcloud run deploy password-generator-service --image ${IMAGE}:$(shell cat $(TAG_FILE)) --platform managed --region us-central1 --allow-unauthenticated
full-deploy: build push deploy