/*===========================================Preloader=========================================*/

var loader = document.getElementById("preloader");
var delayInMilliseconds = 5; //1 second


window.addEventListener("load",function(){
  setTimeout(function() {
    loader.style.display = "none";
  }, delayInMilliseconds);
  
})

/*============================================automatic / toggle theme===============================*/
const themeButton = document.getElementById('theme')
const lightTheme = 'lightTheme'
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')

// Function to apply theme and update icon
const applyTheme = (isLight) => {
  if (isLight) {
    document.body.classList.add(lightTheme)
    if (themeButton) {
      themeButton.classList.remove('bx-sun')
      themeButton.classList.add('bx-moon')
    }
  } else {
    document.body.classList.remove(lightTheme)
    if (themeButton) {
      themeButton.classList.remove('bx-moon')
      themeButton.classList.add('bx-sun')
    }
  }
}

// Initial theme setup: check stored preference or detect browser/system preference
const selectedTheme = localStorage.getItem('selected-theme')
if (selectedTheme) {
  applyTheme(selectedTheme === 'light')
} else {
  // If user has not manually chosen, match browser/system setting
  applyTheme(!prefersDarkScheme.matches)
}

// Listen for browser/system color scheme changes automatically
prefersDarkScheme.addEventListener('change', (e) => {
  if (!localStorage.getItem('selected-theme')) {
    applyTheme(!e.matches)
  }
})

// Allow user to manually toggle theme with button
if (themeButton) {
  themeButton.addEventListener('click', () => {
    const isNowLight = !document.body.classList.contains(lightTheme)
    applyTheme(isNowLight)
    localStorage.setItem('selected-theme', isNowLight ? 'light' : 'dark')
  })
}

/*============================================toggle icon navbar===============================*/

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.nav');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

/*=============================================nav active link================================*/

let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height) {
      navlinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });   
    };
  });
};

/*=================================sticky nav bar==========================================================*/

let header = document.querySelector('header');

header.classList.toggle('sticky',window.scrollY > 100);

/*=========================remove toggle icon and navbar when click navbar link=============================*/

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
  });
});

/*==================================scroll effect============================================================*/

ScrollReveal({ 
  reset: true, 
  distance:'50px',
  duration: 1200,
  delay: 100
});

ScrollReveal().reveal('.home-content, .heading, .skills', { origin: 'top' });
ScrollReveal().reveal('.home-img, .box-container #box2, .contact form, .cert-card, .skills-wrapper', { origin: 'bottom' });
ScrollReveal().reveal('.home h1, .box-container #box1, .about-img, .about-content h3, .education .box-container .box, .contact-card:nth-child(odd)', { origin: 'left' });
ScrollReveal().reveal('.home p, .box-container #box3, .about-content p, .experience-box, .contact-card:nth-child(even)', { origin: 'right' });

/*===============================================typed js=================================================*/

const typed = new Typed('.multiple-text', {
  strings:[
    'Product Management Specialist',
    'ML Data Operations Associate',
    'Business & Data Analyst',
    'Process & QA Lead'
  ],
  typeSpeed:80,
  backSpeed:60,
  backDelay:1200,
  loop:true
}); 

/*===============================================Contact Form Submission=================================================*/

const form = document.querySelector("#form")
const submitButton = document.querySelector("#submitbtn")

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const originalBtnText = submitButton ? submitButton.value : 'Send Message'
    if (submitButton) {
      submitButton.disabled = true
      submitButton.value = "Sending..."
    }

    const formData = new FormData(form)
    const name = formData.get('Name') || ''
    const email = formData.get('Email') || ''
    const phone = formData.get('Mobile Number') || 'Not provided'
    const subject = formData.get('Email Subject') || 'Portfolio Inquiry'
    const message = formData.get('Message') || ''

    try {
      const response = await fetch('https://formsubmit.co/ajax/ritukushwaha3358@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Phone: phone,
          Subject: subject,
          Message: message,
          _subject: `New Portfolio Message from ${name}: ${subject}`
        })
      })

      if (response.ok) {
        alert(`Thank you, ${name}! Your message has been sent successfully to Ritu Kushwaha.`)
        form.reset()
      } else {
        throw new Error('Server response error')
      }
    } catch (error) {
      // Graceful fallback to mailto if external fetch is blocked
      const mailtoUrl = `mailto:ritukushwaha3358@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Hi Ritu,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
      )}`
      window.location.href = mailtoUrl
      alert('Opening your email client to send the message directly to ritukushwaha3358@gmail.com')
    } finally {
      if (submitButton) {
        submitButton.disabled = false
        submitButton.value = originalBtnText
      }
    }
  })
}


