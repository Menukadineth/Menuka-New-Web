document.addEventListener("DOMContentLoaded", () => {
    // Navbar scroll effect
    const navbar = document.getElementById("navbar")
    const mobileMenu = document.getElementById("mobile-menu")
    const menuToggle = document.getElementById("menu-toggle")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("bg-white", "shadow-md")
      } else {
        navbar.classList.remove("bg-white", "shadow-md")
      }
    })
  
    // Mobile menu toggle
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll("a")
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden")
      })
    })
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Initialize Three.js for hero section
    initHeroCanvas()
  
    // Initialize p5.js for about section
    initAboutCanvas()
  
    // Initialize project canvases
    initProjectCanvases()
  })
  
  // Three.js Hero Canvas
  function initHeroCanvas() {
    const canvas = document.getElementById("hero-canvas")
    if (!canvas) return
  
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
  
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1500
  
    const posArray = new Float32Array(particlesCount * 3)
  
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10
    }
  
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
  
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: "#4f46e5",
      transparent: true,
      opacity: 0.8,
    })
  
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)
  
    camera.position.z = 3
  
    // Animation
    function animate() {
      requestAnimationFrame(animate)
  
      particlesMesh.rotation.x += 0.0005
      particlesMesh.rotation.y += 0.0005
  
      renderer.render(scene, camera)
    }
  
    animate()
  
    // Handle window resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })
  }
  
  // p5.js About Canvas
  function initAboutCanvas() {
    const container = document.getElementById("about-canvas-container")
    if (!container) return
  
    const aboutSketch = new p5((p) => {
      const particles = []
      const numParticles = 50
  
      p.setup = () => {
        const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight)
        canvas.parent("about-canvas")
  
        for (let i = 0; i < numParticles; i++) {
          particles.push({
            x: p.random(p.width),
            y: p.random(p.height),
            size: p.random(3, 8),
            speedX: p.random(-0.5, 0.5),
            speedY: p.random(-0.5, 0.5),
            color: p.color(79, 70, 229, p.random(100, 200)),
          })
        }
      }
  
      p.draw = () => {
        p.clear()
  
        // Draw connections
        p.stroke(79, 70, 229, 30)
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const d = p.dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y)
            if (d < 100) {
              p.strokeWeight(1 - d / 100)
              p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y)
            }
          }
        }
  
        // Update and draw particles
        for (const particle of particles) {
          particle.x += particle.speedX
          particle.y += particle.speedY
  
          // Bounce off edges
          if (particle.x < 0 || particle.x > p.width) particle.speedX *= -1
          if (particle.y < 0 || particle.y > p.height) particle.speedY *= -1
  
          p.noStroke()
          p.fill(particle.color)
          p.circle(particle.x, particle.y, particle.size)
        }
      }
  
      p.windowResized = () => {
        p.resizeCanvas(container.offsetWidth, container.offsetHeight)
      }
    })
  }
  
  // Project Canvases with p5.js
  function initProjectCanvases() {
    // Project 1: Lumina - E-commerce Platform
    new p5((p) => {
      p.setup = () => {
        const canvas = p.createCanvas(p.select("#project-canvas-1").width, p.select("#project-canvas-1").height)
        canvas.parent("project-canvas-1")
      }
  
      p.draw = () => {
        p.background(240)
        p.noStroke()
  
        // Draw a stylized shopping bag
        p.fill(79, 70, 229)
        p.rect(p.width / 2 - 30, p.height / 2 - 40, 60, 80, 5)
        p.rect(p.width / 2 - 40, p.height / 2 - 40, 80, 15, 5)
  
        // Draw handles
        p.stroke(79, 70, 229)
        p.strokeWeight(4)
        p.noFill()
        p.arc(p.width / 2 - 20, p.height / 2 - 40, 20, 30, p.PI, p.TWO_PI)
        p.arc(p.width / 2 + 20, p.height / 2 - 40, 20, 30, p.PI, p.TWO_PI)
  
        p.noLoop()
      }
    }, "project-canvas-1")
  
    // Project 2: Horizon - Travel App
    new p5((p) => {
      p.setup = () => {
        const canvas = p.createCanvas(p.select("#project-canvas-2").width, p.select("#project-canvas-2").height)
        canvas.parent("project-canvas-2")
      }
  
      p.draw = () => {
        p.background(240)
  
        // Draw a stylized landscape
        p.noStroke()
  
        // Sky
        p.fill(135, 206, 235)
        p.rect(0, 0, p.width, p.height * 0.6)
  
        // Sun
        p.fill(255, 204, 0)
        p.circle(p.width * 0.7, p.height * 0.3, 50)
  
        // Mountains
        p.fill(79, 70, 229)
        p.triangle(0, p.height * 0.6, p.width * 0.3, p.height * 0.3, p.width * 0.5, p.height * 0.6)
        p.triangle(p.width * 0.4, p.height * 0.6, p.width * 0.7, p.height * 0.2, p.width, p.height * 0.6)
  
        // Ground
        p.fill(34, 139, 34)
        p.rect(0, p.height * 0.6, p.width, p.height * 0.4)
  
        p.noLoop()
      }
    }, "project-canvas-2")
  
    // Project 3: Pulse - Health & Fitness
    new p5((p) => {
      const angle = 0
  
      p.setup = () => {
        const canvas = p.createCanvas(p.select("#project-canvas-3").width, p.select("#project-canvas-3").height)
        canvas.parent("project-canvas-3")
      }
  
      p.draw = () => {
        p.background(240)
  
        // Draw a heartbeat line
        p.stroke(220, 20, 60)
        p.strokeWeight(3)
        p.noFill()
  
        p.beginShape()
        for (let x = 0; x < p.width; x++) {
          let y = p.height / 2
  
          // Create heartbeat pattern
          if (x > p.width * 0.3 && x < p.width * 0.4) {
            y = p.height / 2 - 30 * p.sin((x - p.width * 0.3) * 0.2)
          } else if (x > p.width * 0.4 && x < p.width * 0.5) {
            y = p.height / 2 + 50 * p.sin((x - p.width * 0.4) * 0.2)
          } else if (x > p.width * 0.5 && x < p.width * 0.6) {
            y = p.height / 2 - 30 * p.sin((x - p.width * 0.5) * 0.2)
          }
  
          p.vertex(x, y)
        }
        p.endShape()
  
        p.noLoop()
      }
    }, "project-canvas-3")
  
    // Project 4: Nova - SaaS Dashboard
    new p5((p) => {
      p.setup = () => {
        const canvas = p.createCanvas(p.select("#project-canvas-4").width, p.select("#project-canvas-4").height)
        canvas.parent("project-canvas-4")
      }
  
      p.draw = () => {
        p.background(240)
  
        // Draw a stylized dashboard
        p.noStroke()
  
        // Header
        p.fill(79, 70, 229)
        p.rect(p.width * 0.1, p.height * 0.1, p.width * 0.8, p.height * 0.15, 5)
  
        // Sidebar
        p.fill(79, 70, 229, 200)
        p.rect(p.width * 0.1, p.height * 0.25, p.width * 0.2, p.height * 0.65, 5)
  
        // Main content area
        p.fill(255)
        p.rect(p.width * 0.3, p.height * 0.25, p.width * 0.6, p.height * 0.3, 5)
        p.rect(p.width * 0.3, p.height * 0.55, p.width * 0.6, p.height * 0.35, 5)
  
        // Chart elements
        p.fill(79, 70, 229, 100)
        p.rect(p.width * 0.35, p.height * 0.3, p.width * 0.2, p.height * 0.2, 5)
        p.rect(p.width * 0.6, p.height * 0.3, p.width * 0.25, p.height * 0.2, 5)
  
        p.fill(79, 70, 229, 150)
        p.rect(p.width * 0.35, p.height * 0.6, p.width * 0.5, p.height * 0.25, 5)
  
        p.noLoop()
      }
    }, "project-canvas-4")
  
    // Project 5: Vertex - 3D Product Configurator
    new p5((p) => {
      p.setup = () => {
        const canvas = p.createCanvas(p.select("#project-canvas-5").width, p.select("#project-canvas-5").height)
        canvas.parent("project-canvas-5")
      }
  
      p.draw = () => {
        p.background(240)
  
        // Draw a stylized 3D cube
        p.translate(p.width / 2, p.height / 2)
        p.rotateX(p.PI / 4)
        p.rotateY(p.PI / 4)
  
        // Cube
        p.stroke(79, 70, 229)
        p.strokeWeight(2)
        p.noFill()
        p.box(100)
  
        // Control panel
        p.resetMatrix()
        p.noStroke()
        p.fill(79, 70, 229, 100)
        p.rect(p.width * 0.1, p.height * 0.7, p.width * 0.8, p.height * 0.2, 5)
  
        p.noLoop()
      }
    }, "project-canvas-5")
  
    // Project 6: Echo - Music Streaming Platform
    new p5((p) => {
      p.setup = () => {
        const canvas = p.createCanvas(p.select("#project-canvas-6").width, p.select("#project-canvas-6").height)
        canvas.parent("project-canvas-6")
      }
  
      p.draw = () => {
        p.background(240)
  
        // Draw a stylized music player
        p.noStroke()
  
        // Player background
        p.fill(79, 70, 229)
        p.rect(p.width * 0.1, p.height * 0.2, p.width * 0.8, p.height * 0.6, 10)
  
        // Album art
        p.fill(255)
        p.rect(p.width * 0.2, p.height * 0.3, p.width * 0.25, p.width * 0.25, 5)
  
        // Player controls
        p.fill(255)
        p.circle(p.width * 0.6, p.height * 0.4, 30)
        p.rect(p.width * 0.5, p.height * 0.5, p.width * 0.2, 10, 5)
  
        // Sound waves
        p.stroke(255)
        p.strokeWeight(2)
        for (let i = 0; i < 5; i++) {
          const h = p.random(10, 30)
          p.line(p.width * (0.5 + i * 0.05), p.height * 0.6 - h / 2, p.width * (0.5 + i * 0.05), p.height * 0.6 + h / 2)
        }
  
        p.noLoop()
      }
    }, "project-canvas-6")
  }
  
  