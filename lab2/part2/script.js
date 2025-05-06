class User {
  constructor(name, age) {
    this.name = name;
    this._age = age;
    this._tel = '';
  }

  hello() {
    console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
  }

  get age() {
    return this._age;
  }

  set age(value) {
    if (Number.isInteger(value) && value >= 1 && value <= 100) {
      this._age = value;
    } else {
      alert('Age must be an integer between 1 and 100');
    }
  }

  get tel() {
    return this._tel;
  }

  set tel(value) {
    if (/^\+7\d{10}$/.test(value)) {
      this._tel = value;
    } else {
      alert('Phone must be in format +7xxxxxxxxxx');
    }
  }
}

function UserFunction(name, age) {
  this.name = name;
  this._age = age;
  this._tel = '';

  this.hello = function () {
    console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
  };
}

Object.defineProperty(UserFunction.prototype, 'age', {
  get: function () {
    return this._age;
  },
  set: function (value) {
    if (Number.isInteger(value) && value >= 1 && value <= 100) {
      this._age = value;
    } else {
      alert('Age must be an integer between 1 and 100');
    }
  }
});

Object.defineProperty(UserFunction.prototype, 'tel', {
  get: function () {
    return this._tel;
  },
  set: function (value) {
    if (/^\+7\d{10}$/.test(value)) {
      this._tel = value;
    } else {
      alert('Phone must be in format +7xxxxxxxxxx');
    }
  }
});

class Student extends User {
  constructor(name, age) {
    super(name, age);
    this._knowledge = 0;
  }

  hello() {
    console.log(`Hi! My name is ${this.name}. I am ${this.age} years old. And I am a student!`);
  }

  learn() {
    this._knowledge++;
  }

  get knowledge() {
    return this._knowledge;
  }
}

Array.prototype.originalReverse = Array.prototype.reverse;

Array.prototype.reverse = function () {
  const duplicated = this.concat(this);
  this.length = 0;
  this.push(...duplicated);
  return this;
};

const user = new User("Sashok", 20);
user.hello();

const userFunc = new UserFunction("Sashka", 20);
userFunc.hello();

user.tel = prompt("Enter phone (+7xxxxxxxxxx):");
alert(`User phone: ${user.tel}`);

user.age = parseInt(prompt("Enter age (1-100):"));
alert(`User age: ${user.age}`);

const student = new Student("Alexander", 21);
student.hello();
student.learn();
student.learn();
student.learn();
student.learn();
alert(`Student knowledge: ${student.knowledge}`);

const arr = [1, 2, 3, 4, 5];
arr.reverse();
alert(`Modified array: ${arr}`); // [1,2,3,4,5,1,2,3,4,5]