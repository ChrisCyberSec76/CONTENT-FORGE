# Example Data and Outputs

This folder contains **example request/response JSON** and **sample output media** that show what the app can produce.

---

## Example: build a post from one prompt

**[Single-prompt video example](media/single_prompt_video_example.mp4.mp4)** (`examples/media/`)

This video is **reference output** for the flow: **one text prompt → full video post**. The production app takes a single prompt, runs it through the media pipeline (video generation, optional voiceover and music, composition), and produces a post-ready asset. This file is that kind of output—included so the repo can show what the app produces and so the showcase API can point to a real example when explaining the "one prompt → post" use case.

- **Where it runs**: Use the [main README Quick Start](../README.md#-quick-start) to run the showcase API (`uvicorn backend.app:app --reload`). The mock endpoints use the same *contracts* as the real app; this video is the example of the final output.
- **Link in README**: The main [README](../README.md) links to this file under "Example: build a post from one prompt."

---

## JSON examples

- `access_response_example.json` – access endpoint response
- `subscription_response_example.json` – subscription/credits response
- `voiceover_request_example.json` – voiceover request body
- `video_generate_request_example.json` – video generation request body
- `media_compose_request_example.json` – multi-clip composition request
- `api_response_example.json` – combined API response examples

---

## Adding more example media

To add another sample video or image:

1. Put the file in **`examples/media/`** (e.g. `my_example.mp4`).
2. Update this README with a short description and link.
3. Optionally add a link from the main [README](../README.md).

GitHub allows files up to **100 MB**. For larger files, use [GitHub LFS](https://git-lfs.github.com/) or host elsewhere and link here.
