# Roadmap

## Current Status

**Version**: 1.0.0-showcase  
**Status**: Public showcase layer complete

---

## Phase 1: Foundation ✅

- [x] Architecture documentation
- [x] Access and auth contract documentation
- [x] Media pipeline documentation
- [x] Interface definitions (access, generation)
- [x] Mock API endpoints
- [x] Pydantic schemas and example JSON

---

## Phase 2: Enhanced Documentation (Planned)

- [ ] OpenAPI/Swagger annotations and examples
- [ ] Sequence diagrams for access and generation flow
- [ ] Data flow diagrams for compose pipeline
- [ ] Deployment and security overview (no secrets)

---

## Phase 3: Extended Examples (Planned)

- [ ] More request/response examples per endpoint
- [ ] Error response examples (402, 403, 429)
- [ ] Webhook/polling contract examples (if exposed)
- [ ] Compose request examples with multiple clips

---

## Phase 4: Interactive Demos (Future)

- [ ] Simple web UI for showcase API
- [ ] Example frontend calling mock endpoints
- [ ] Pipeline diagram (video → voice → music → compose)

---

## Long-Term Vision

- Keep public repo limited to contracts, mocks, and docs
- Production implementation remains private
- Possible public SDK or client library that talks to documented API shape only

---

## Contribution Guidelines

This is a showcase repository. Contributions should:

- ✅ Improve documentation clarity
- ✅ Add example request/response payloads
- ✅ Extend interface definitions and schemas
- ❌ NOT expose production code or provider integrations
- ❌ NOT include real credentials or API keys
- ❌ NOT reveal proprietary composition or billing logic

---

## Version History

### v1.0.0-showcase (Current)

- Initial public showcase
- ARCHITECTURE, ACCESS_AND_AUTH, MEDIA_GENERATION_PIPELINE, ROADMAP
- Mock health, access, subscription, video, voiceover, music endpoints
- Pydantic schemas and example JSON files
