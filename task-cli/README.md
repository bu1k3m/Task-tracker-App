# Task Tracker CLI

A lightweight command-line task tracker built in Node.js for managing personal tasks from the terminal.

This project follows the Roadmap.sh task tracker challenge:
https://roadmap.sh/projects/task-tracker

## Features

- Add new tasks
- Update task descriptions
- Delete tasks
- Mark tasks as todo, in-progress, or done
- List tasks with optional filtering
- Store tasks in a local `tasks.json` file

## Project Structure

- `task-cli.cjs` — main CLI application
- `tasks.json` — task storage file
- `package.json` — project metadata and CLI setup

## Installation

From the project folder, install dependencies if needed:

```bash
npm install
```

You can also use the CLI directly from the project directory:

```bash
node task-cli.cjs add "Write project summary"
```

## Usage

### Add a task

```bash
task-cli add "Finish the report"
```

### List all tasks

```bash
task-cli list
```

### List tasks by status

```bash
task-cli list todo
task-cli list in-progress
task-cli list done
```

### Update a task

```bash
task-cli update 1 "Finish the report and submit it"
```

### Delete a task

```bash
task-cli delete 1
```

### Mark a task as in progress

```bash
task-cli mark-in-progress 1
```

### Mark a task as done

```bash
task-cli mark-done 1
```

## Notes

- The app stores tasks in a local `tasks.json` file in the current working directory.
- If the file does not exist, it is created automatically.
- The CLI uses numeric task IDs for updates, deletion, and status changes.

## License

MIT
