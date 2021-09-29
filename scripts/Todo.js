//Todo constructor
export function Todo(description) {
    this.id = Math.random().toString(36).substr(2, 9)
    this.text = description
    this.isChecked = false
    this.date = new Date().toDateString()
  }