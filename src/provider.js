import {Task} from "./task";

const objectToArray = (object) => {
  console.log(222);
  console.log(Object.keys(object).map((id) => object[id]));
  return Object.keys(object).map((id) => object[id]);
};

export const Provider = class {
  constructor({api, store, generateId}) {
    this._api = api;
    this._store = store;
    this._generateId = generateId;
    this._needSync = false;
  }

  updateTask({id, data}) {
    console.log(data);
    if (this._isOnline()) {
      return this._api.updateTask({id, data}).then((task) => {
        console.log(task);
        this._store.setItem({key: task.id, item: task.toRAW()});
        return task;
      });
    } else {
      const task = data;
      this._needSync = true;
      this._store.setItem({key: task.id, item: task});

      return Promise.resolve(Task.parseTask(task));
    }
  }

  createTask({task}) {
    if (this._isOnline()) {
      return this._api.createTask({task}).then((taskItem) => {
        this._store.setItem({key: taskItem.id, item: taskItem.toRAW()});
        return taskItem;
      });
    } else {
      task.id = this._generateId();
      this._needSync = true;

      this._store.setItem({key: task.id, item: task});
      return Promise.resolve(Task.parseTask(task));
    }
  }

  deleteTask({id}) {
    if (this._isOnline()) {
      return this._api.deleteTask({id}).then(() => {
        this._store.removeItem({key: id});
      });
    } else {
      this._needSync = true;
      this._store.removeItem({key: id});
      return Promise.resolve(true);
    }
  }

  getTask() {
    if (this._isOnline()) {
      return this._api.getTask().then((tasks) => {
        tasks.map((it) =>
          this._store.setItem({key: it.id, item: it.toRAW()})
        );

        return tasks;
      });
    } else {
      const rawTasksMap = this._store.getAll();
      const rawTasks = objectToArray(rawTasksMap);
      const tasks = Task.parseTasks(rawTasks);

      return Promise.resolve(tasks);
    }
  }

  syncTasks() {
    return this._api.syncTasks({tasks: objectToArray(this._store.getAll())});
  }

  _isOnline() {
    return window.navigator.onLine;
  }
};
