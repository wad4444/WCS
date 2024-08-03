import TestEZ from "@rbxts/testez";

TestEZ.TestBootstrap.run(
	[game.GetService("ReplicatedStorage").FindFirstChild("library")!],
	TestEZ.Reporters.TextReporter,
);
