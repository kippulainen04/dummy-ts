import Cmp from './base-component';
import * as Validation from '../util/validation';
import { autobind as Autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';

// ProjectInput CLass
export class ProjectInput extends Cmp<HTMLDivElement, HTMLFormElement> {
    titleInputEl: HTMLInputElement;
    descriptionInputEl: HTMLInputElement;
    peopleInputEl: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputEl = this.element.querySelector(
            '#title'
          ) as HTMLInputElement;
          this.descriptionInputEl = this.element.querySelector(
            '#description'
          ) as HTMLInputElement;
          this.peopleInputEl = this.element.querySelector(
            '#people'
          ) as HTMLInputElement;
        this.configure();
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() {}

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputEl.value;
        const enteredDescription = this.descriptionInputEl.value;
        const enteredPeople = this.peopleInputEl.value;

        const titleValidatable: Validation.Validatable = {
            value: enteredTitle,
            required: true
        }
        const descriptionValidatable: Validation.Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        }
        const peoplealidatable: Validation.Validatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 5
        }

    
        if (
          !Validation.validate(titleValidatable) ||
          !Validation.validate(descriptionValidatable) ||
          !Validation.validate(peoplealidatable)
        ) {
          alert('Invalid input, please try again!');
          return;
        } else {
          return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    private clearInputs() {
        this.titleInputEl.value = '';
        this.descriptionInputEl.value = '';
        this.peopleInputEl.value = '';
    }

    // error here cuz this inside submitHandler doesnt point to the class, but to current target of the Event
    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title,desc, people);
            this.clearInputs();
        }
    }
}

