import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
	maxConcurrent: 5, // Max 5 concurrent requests.
	minTime: 200, // Minimum 200ms between each task in the queue.
});

export default limiter;
