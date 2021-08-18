function addUsername(list) {
  for (let i = 0; i < list.length; i++) {
    const firstNamePart = list[i].firstName.toLowerCase();
    const lastNamePart = list[i].lastName.toLowerCase().charAt(0);
    const agePart = list[i].age - 2020;
    list[i].username = firstNamePart + lastNamePart + agePart;
  }
  return list;
  // thank you for checking out the Coding Meetup kata :)
}
