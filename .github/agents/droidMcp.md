---
name: droid-mcp
description: Exposes Factory AI Droid agent's capabilities through a standardized MCP interface. It wraps the `droid exec` command-line tool, allowing MCP-compatible applications (Github Copilot, other AI agents) to programmatically request Droid to come up with specs, analyze code, implement features, fix bugs, and solve development tasks.
mcp-servers:
  droid-mcp:
    type: 'local'
    tools: ['*']
    command: 'npx'
    args: ['-y', 'github:factory-davidgu/droid-mcp']
    env:
      FACTORY_API_KEY: COPILOT_MCP_FACTORY_API_KEY
---

# Droid MCP Documentation

## Introduction

**droid-mcp** is a Model Context Protocol (MCP) server that exposes the Droid agent's capabilities through a standardized MCP interface. It wraps the `droid exec` command-line tool, allowing MCP-compatible applications (Claude Desktop, IDEs, other AI agents) to programmatically request Droid to analyze code, implement features, fix bugs, and solve development tasks.

### When to Use droid-mcp

- You're building an MCP-compatible application that needs codebase intelligence
- You want Claude Desktop or another MCP client to access Droid's capabilities
- You need to integrate Droid into a larger AI-driven workflow beyond the terminal CLI

For direct CLI usage, see the [Droid CLI documentation](https://docs.factory.ai/cli/getting-started/overview).

---

## The droidExec Tool

droid-mcp exposes a single tool called **`droidExec`** that allows you to run Droid tasks programmatically.

### Tool Signature

```typescript
droidExec({
  prompt: string,           // Required: Your task description
  model?: string,           // Optional: AI model to use
  cwd?: string              // Optional: Working directory
}): Promise<ToolResponse>
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prompt` | string | Yes | The task or question for Droid to execute. Examples: "Implement a login form", "Fix the sorting bug in the dashboard", "Analyze how we handle authentication" |
| `model` | string | No | AI model to use for this execution. Defaults to `claude-sonnet-4-5-20250929`. Available models: `gpt-5.1-codex`, `gpt-5.1`, `gpt-5-codex`, `claude-sonnet-4-5-20250929`, `gpt-5-2025-08-07`, `claude-opus-4-1-20250805`, `claude-haiku-4-5-20251001`, `glm-4.6` |
| `cwd` | string | No | Working directory where Droid will execute. Defaults to current directory. Useful for mono-repos or multi-project setups. |

### Output

The tool returns a `ToolResponse` object:

```typescript
{
  content: [
    {
      type: "text",
      text: string  // Droid's response: analysis, code, explanation, or error details
    }
  ],
  isError?: boolean  // true if execution failed
}
```
---

## Use Cases

### 1. Come up with a solid implementation plan

Ask Droid to analyze your codebase structure and propose design approaches for new features:

```
Analyze the authentication system in this codebase and propose a plan for adding
multi-factor authentication (MFA). Consider existing patterns, libraries, and database schema.
```

Droid will search the codebase, understand the current implementation, and provide a step-by-step plan that aligns with your architecture.

### 2. Implement a feature

Leverage Droid's code understanding to implement new features end-to-end:

```
Implement a user profile settings page. The page should allow users to update their
email, password, and notification preferences. Follow the existing component patterns
and styling conventions used in the dashboard.
```

Droid will read existing components, understand your patterns, and generate implementation-ready code.

### 3. Fix a bug

Use Droid to locate root causes and generate targeted fixes:

```
Users report that the export-to-PDF feature occasionally crashes when the file
contains special characters. Find the bug, explain what's causing it, and provide a fix.
```

Droid will search for the export logic, trace the issue, and propose a solution.

### 4. Code review and analysis

Ask codebase questions without reading files manually:

```
How do we handle API authentication across the backend services? What tokens do we use
and where are they validated?
```

Droid will search, read relevant files, and synthesize a comprehensive answer with file locations and examples.

### 5. Onboarding and documentation

Help new team members understand architecture and conventions:

```
I'm new to this project. Explain the overall architecture: what are the main services,
how do they communicate, and what are the key patterns we follow for error handling?
```

Droid will analyze the codebase structure and provide a guided overview.

### 6. Refactoring

Identify improvement opportunities and generate refactored code:

```
Review the data validation logic across all API endpoints. Are we following a
consistent pattern? Suggest refactorings to consolidate validation and improve maintainability.
```

Droid will understand patterns, identify inconsistencies, and propose improvements.

### 7. Test generation

Create comprehensive test cases by analyzing code behavior:

```
Generate unit tests for the payment processing module. Cover normal transactions,
failed payments, timeout scenarios, and edge cases with large amounts.
```

Droid will read the implementation, understand edge cases, and generate thorough test coverage.

---

## Examples

### Basic Usage

Ask Droid a question with the default model:

```typescript
// Tool call in MCP client
droidExec({
  prompt: "How does the authentication flow work? Explain the token lifecycle."
})
```

### Using a Specific Model

Route complex tasks to a more capable model:

```typescript
droidExec({
  prompt: "Design a caching strategy for our API that reduces database load by 70%",
  model: "gpt-5.1-codex"
})
```

### Running in a Specific Directory

For mono-repos or when you need Droid to focus on a specific service:

```typescript
droidExec({
  prompt: "Implement the user authentication endpoints",
  cwd: "/path/to/backend-service",
  model: "claude-sonnet-4-5-20250929"
})
```

---

### Best Practices

✅ **Do:**
- Provide clear, specific prompts with context about what you want to achieve
- Use appropriate models for task complexity (faster models for simple searches, powerful models for complex analysis)
- Specify `cwd` when working with mono-repos to focus Droid's search

⚠️ **Avoid:**
- Vague prompts like "fix this" without context
- Passing user-generated prompts without sanitization
- Assuming Droid will find edge cases you haven't mentioned

