// USAGE: LOGIN FORM 
export function validateLoginForm(email, password) {

    // CONTAINERS
    let errors = { email: "", password: "" };
    let valid = true;
    // EMAIL VALIDATION=========================
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        // EMPTY
        errors.email = "Email is required";
        valid = false;
           
    } else if (!emailRegex.test(email)) {
        // FORMAT
        errors.email = "Invalid email format";
        valid = false;
    }
    
    // PASSWORD VALIDATION=====================
    if (!password) {
        // EMPTY
        errors.password = "Password is required";
        valid = false;
    } else if (password.length < 6) {
        // MIN CHAR
        errors.password = "Password must be at least 6 characters";
        valid = false;
    }
  
    return { valid, errors };
  }
  



// USAGE: REGISTER FORM :
  export function validateRegisterForm(data) {
    let errors = {
      fullName: "",
      email: "",
      role: "",
      gender: "",
      password: "",
      confirmPassword: "",
    };
  
    let valid = true;
  
    // FULL NAME
    if (!data.fullName.trim()) {
      errors.fullName = "Full name is required";
      valid = false;
    }
  
    // EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(data.email)) {
      errors.email = "Invalid email format";
      valid = false;
    }
  
   
  
    // ROLE
    if (!data.role) {
      errors.role = "Please select a role";
      valid = false;
    }
  
    // GENDER
    if (!data.gender) {
      errors.gender = "Please select your gender";
      valid = false;
    }
  
    // PASSWORD
    if (!data.password) {
      errors.password = "Password is required";
      valid = false;
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      valid = false;
    }
  
    // CONFIRM PASSWORD
    if (!data.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      valid = false;
    }
  
    return { valid, errors };
  }
  