import {
  Task
} from "./task";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => {
  return response.json();
};

export const API = class {
  constructor({
    endPoint,
    authorization
  }) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getTask() {
    return this._load({
      url: `tasks`
    })
      .then(toJSON)
      .then(Task.parseTasks);

  }

  createTask({
    task
  }) {
    return this._load({
      url: `tasks`,
      method: Method.POST,
      body: JSON.stringify(task),
      headers: new Headers({
        'Content-Type': `application/json`
      })
    })
      .then(toJSON)
      .then(Task.parseTask);
  }

  updateTask({
    id,
    data
  },
  card) {
    card.querySelectorAll(`form input, form select, form textarea, form button`)
    .forEach((elem) => {
      elem.setAttribute(`disabled`, `disabled`);
    });

    card.querySelector(`.card__save`).textContent = `Saving...`;

    return this._load({
      url: `tasks/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': `application/json`
      })
    })
      .then(toJSON)
      .then(Task.parseTask);
  }

  deleteTask({
    id
  }, card) {
    card.querySelectorAll(`form input, form select, form textarea, form button`)
    .forEach((elem) => {
      elem.setAttribute(`disabled`, `disabled`);
    });

    card.querySelector(`.card__delete`).textContent = `Deleting...`;

    return this._load({
      url: `tasks/${id}`,
      method: Method.DELETE
    });
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    const noTask = document.querySelector(`.board__no-tasks`);
    noTask.classList.remove(`visually-hidden`);
    noTask.textContent = `Loading tasks...`;

    return fetch(`${this._endPoint}/${url}`, {
      method,
      body,
      headers
    })
      .then(checkStatus);

  }
};
