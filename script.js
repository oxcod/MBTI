// ===== GLOBAL STATE =====
let currentQuestion = 0;
let answers = [];
let mbtiResult = '';
let isTransitioning = false;

// MBTI Type Definitions
const mbtiTypes = {
    'ENFP': {
        title: '活力四射的灵感家',
        subtitle: '你是天生的激励者和创新者',
        description: '热情洋溢，富有创造力，总能在生活中发现新的可能性。你善于激励他人，是团队中的正能量担当。',
        traits: {
            energy: '外向型 - 从社交中获得能量',
            info: '直觉型 - 关注可能性和未来',
            decision: '情感型 - 重视价值观和人际关系',
            lifestyle: '知觉型 - 灵活适应，保持开放'
        },
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        keywords: ['创新者', '激励者', '梦想家', '社交达人']
    },
    'ENFJ': {
        title: '天生的领导者',
        subtitle: '你是有感染力的激励大师',
        description: '富有魅力的天然领袖，善于发现他人的潜力并激发最好的一面。你关心他人的成长和福祉。',
        traits: {
            energy: '外向型 - 从社交中获得能量',
            info: '直觉型 - 关注可能性和未来',
            decision: '情感型 - 重视价值观和人际关系',
            lifestyle: '判断型 - 喜欢有序和计划'
        },
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        keywords: ['领导者', '导师', '激励师', '成长教练']
    },
    'ENTP': {
        title: '机智的辩论家',
        subtitle: '你是充满智慧的创新思考者',
        description: '聪明机智，喜欢挑战传统思维。你总能提出新颖的想法，擅长从不同角度分析问题。',
        traits: {
            energy: '外向型 - 从社交中获得能量',
            info: '直觉型 - 关注可能性和未来',
            decision: '思维型 - 重视逻辑和客观分析',
            lifestyle: '知觉型 - 灵活适应，保持开放'
        },
        color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        keywords: ['辩论家', '创新者', '智者', '思想家']
    },
    'ENTJ': {
        title: '果断的指挥官',
        subtitle: '你是天生的战略领导者',
        description: '果敢决断的天然领袖，具有强大的组织能力和战略眼光。你善于制定长远计划并推动执行。',
        traits: {
            energy: '外向型 - 从社交中获得能量',
            info: '直觉型 - 关注可能性和未来',
            decision: '思维型 - 重视逻辑和客观分析',
            lifestyle: '判断型 - 喜欢有序和计划'
        },
        color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        keywords: ['指挥官', '战略家', '领导者', '执行官']
    },
    'ESFP': {
        title: '自由奔放的表演者',
        subtitle: '你是充满活力的生活艺术家',
        description: '热情开朗，享受当下的每一刻。你善于与人建立联系，总能为周围带来欢乐和正能量。',
        traits: {
            energy: '外向型 - 从社交中获得能量',
            info: '感觉型 - 关注当下和具体细节',
            decision: '情感型 - 重视价值观和人际关系',
            lifestyle: '知觉型 - 灵活适应，保持开放'
        },
        color: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
        keywords: ['表演者', '娱乐家', '自由者', '社交明星']
    },
    'ESFJ': {
        title: '热心的领事官',
        subtitle: '你是温暖的人际关系专家',
        description: '关爱他人，善于营造和谐的氛围。你注重传统价值，总是愿意为他人提供帮助和支持。',
        traits: {
            energy: '外向型 - 从社交中获得能量',
            info: '感觉型 - 关注当下和具体细节',
            decision: '情感型 - 重视价值观和人际关系',
            lifestyle: '判断型 - 喜欢有序和计划'
        },
        color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        keywords: ['领事官', '照顾者', '协调者', '团队润滑剂']
    },
    'ESTP': {
        title: '活力四射的企业家',
        subtitle: '你是行动派的冒险家',
        description: '精力充沛，勇于冒险。你善于抓住机遇，在压力下表现出色，是天生的问题解决者。',
        traits: {
            energy: '外向型 - 从社交中获得能量',
            info: '感觉型 - 关注当下和具体细节',
            decision: '思维型 - 重视逻辑和客观分析',
            lifestyle: '知觉型 - 灵活适应，保持开放'
        },
        color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        keywords: ['企业家', '冒险家', '实践者', '机会捕手']
    },
    'ESTJ': {
        title: '严谨的总经理',
        subtitle: '你是可靠的组织管理者',
        description: '负责任且高效，善于组织和管理。你重视传统和秩序，总能确保事情按计划进行。',
        traits: {
            energy: '外向型 - 从社交中获得能量',
            info: '感觉型 - 关注当下和具体细节',
            decision: '思维型 - 重视逻辑和客观分析',
            lifestyle: '判断型 - 喜欢有序和计划'
        },
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        keywords: ['总经理', '管理者', '组织者', '执行专家']
    },
    'INFP': {
        title: '理想主义的调停者',
        subtitle: '你是充满创意的梦想追求者',
        description: '内心丰富，追求理想和真实。你富有同情心和创造力，总是在寻找让世界变得更好的方式。',
        traits: {
            energy: '内向型 - 从独处中获得能量',
            info: '直觉型 - 关注可能性和未来',
            decision: '情感型 - 重视价值观和人际关系',
            lifestyle: '知觉型 - 灵活适应，保持开放'
        },
        color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        keywords: ['调停者', '理想主义者', '创意家', '价值守护者']
    },
    'INFJ': {
        title: '睿智的提倡者',
        subtitle: '你是富有洞察力的理想主义者',
        description: '深刻而富有洞察力，能够理解复杂的人性。你追求有意义的生活，致力于帮助他人实现潜能。',
        traits: {
            energy: '内向型 - 从独处中获得能量',
            info: '直觉型 - 关注可能性和未来',
            decision: '情感型 - 重视价值观和人际关系',
            lifestyle: '判断型 - 喜欢有序和计划'
        },
        color: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
        keywords: ['提倡者', '洞察者', '理想主义者', '灵魂导师']
    },
    'INTP': {
        title: '逻辑学家思想家',
        subtitle: '你是追求真理的理论建构者',
        description: '喜欢思考和分析，对知识充满渴望。你善于发现模式和联系，总是在寻求理解事物的本质。',
        traits: {
            energy: '内向型 - 从独处中获得能量',
            info: '直觉型 - 关注可能性和未来',
            decision: '思维型 - 重视逻辑和客观分析',
            lifestyle: '知觉型 - 灵活适应，保持开放'
        },
        color: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
        keywords: ['逻辑学家', '思想家', '理论家', '知识探索者']
    },
    'INTJ': {
        title: '独立的建筑师',
        subtitle: '你是战略性的远见卓识者',
        description: '独立思考，具有强烈的洞察力和决心。你善于制定长远战略，总能看到别人看不到的可能性。',
        traits: {
            energy: '内向型 - 从独处中获得能量',
            info: '直觉型 - 关注可能性和未来',
            decision: '思维型 - 重视逻辑和客观分析',
            lifestyle: '判断型 - 喜欢有序和计划'
        },
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        keywords: ['建筑师', '战略家', '远见者', '系统思考者']
    },
    'ISFP': {
        title: '温和的冒险家',
        subtitle: '你是敏感的艺术创作者',
        description: '温和而富有艺术气质，对美有敏锐的感知。你重视个人价值观，喜欢以自己的方式探索世界。',
        traits: {
            energy: '内向型 - 从独处中获得能量',
            info: '感觉型 - 关注当下和具体细节',
            decision: '情感型 - 重视价值观和人际关系',
            lifestyle: '知觉型 - 灵活适应，保持开放'
        },
        color: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
        keywords: ['冒险家', '艺术家', '美学家', '价值坚守者']
    },
    'ISFJ': {
        title: '守护者保护人',
        subtitle: '你是细心的照顾者',
        description: '细心体贴，总是为他人着想。你重视传统和稳定，善于创造温暖和谐的环境。',
        traits: {
            energy: '内向型 - 从独处中获得能量',
            info: '感觉型 - 关注当下和具体细节',
            decision: '情感型 - 重视价值观和人际关系',
            lifestyle: '判断型 - 喜欢有序和计划'
        },
        color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        keywords: ['守护者', '保护人', '照顾者', '传统维护者']
    },
    'ISTP': {
        title: '灵活的鉴赏家',
        subtitle: '你是实用的问题解决专家',
        description: '冷静理性，善于用双手解决问题。你喜欢了解事物的工作原理，总能找到最有效的解决方案。',
        traits: {
            energy: '内向型 - 从独处中获得能量',
            info: '感觉型 - 关注当下和具体细节',
            decision: '思维型 - 重视逻辑和客观分析',
            lifestyle: '知觉型 - 灵活适应，保持开放'
        },
        color: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
        keywords: ['鉴赏家', '工匠', '实用主义者', '问题解决者']
    },
    'ISTJ': {
        title: '可靠的物流师',
        subtitle: '你是值得信赖的责任承担者',
        description: '可靠稳重，具有强烈的责任感。你重视传统和秩序，总是认真完成自己的职责。',
        traits: {
            energy: '内向型 - 从独处中获得能量',
            info: '感觉型 - 关注当下和具体细节',
            decision: '思维型 - 重视逻辑和客观分析',
            lifestyle: '判断型 - 喜欢有序和计划'
        },
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        keywords: ['物流师', '可靠者', '传统主义者', '责任担当']
    }
};

// ===== MAIN FUNCTIONS =====

function startTest() {
    currentQuestion = 0;
    answers = [];
}

function selectOption(questionIndex, type, element) {
    // Prevent double clicks and rapid clicking
    if (isTransitioning) {
        return;
    }
    
    isTransitioning = true;
    
    // Remove previous selection
    const allOptions = element.parentNode.querySelectorAll('.option-btn');
    allOptions.forEach(btn => btn.classList.remove('selected'));
    
    // Add selection to current option with immediate feedback
    element.classList.add('selected');
    
    // Store answer
    answers[currentQuestion] = type;
    
    // Apple-style haptic feedback simulation
    element.style.transform = 'scale(1.08) translateY(-3px)';
    
    // Smooth return to selected state
    setTimeout(() => {
        element.style.transform = 'scale(1.05) translateY(-2px)';
    }, 150);
    
    // Move to next question with perfect timing
    setTimeout(() => {
        if (currentQuestion < 3) {
            nextQuestion();
        } else {
            calculateResult();
        }
    }, 600);
}

function nextQuestion() {
    const currentCard = document.querySelector(`[data-question="${currentQuestion}"]`);
    const nextCard = document.querySelector(`[data-question="${currentQuestion + 1}"]`);
    
    if (currentCard && nextCard) {
        // Apple-style smooth transition
        currentCard.classList.add('leaving');
        
        setTimeout(() => {
            currentCard.classList.remove('active', 'leaving');
            currentQuestion++;
            
            // Update progress immediately
            updateProgress();
            
            // Prepare next card for entrance
            nextCard.style.transform = 'translateX(120px) scale(0.95) rotateY(15deg)';
            nextCard.style.opacity = '0';
            nextCard.classList.add('active');
            
            // Smooth entrance animation
            requestAnimationFrame(() => {
                nextCard.style.transform = 'translateX(0) scale(1) rotateY(0deg)';
                nextCard.style.opacity = '1';
                
                // Reset and trigger animations for new question elements
                const elements = nextCard.querySelectorAll('.question-icon, .question-title, .question-subtitle, .option-btn');
                elements.forEach(el => {
                    el.style.animation = 'none';
                    el.offsetHeight; // Trigger reflow
                    el.style.animation = null;
                });
            });
            
            // Re-enable clicking after transition completes
            setTimeout(() => {
                isTransitioning = false;
            }, 600);
        }, 400);
    } else {
        // Fallback in case cards not found
        isTransitioning = false;
    }
}

function updateProgress() {
    // Update progress dots
    const allDots = document.querySelectorAll('.progress-dot');
    const currentStepSpan = document.getElementById('current-step');
    
    allDots.forEach((dot, index) => {
        dot.classList.remove('active', 'completed');
        
        if (index < currentQuestion) {
            dot.classList.add('completed');
        } else if (index === currentQuestion) {
            dot.classList.add('active');
        }
    });
    
    if (currentStepSpan) {
        currentStepSpan.textContent = currentQuestion + 1;
    }
}

function calculateResult() {
    // Calculate MBTI type based on answers
    mbtiResult = answers.join('');
    
    // Display result immediately
    displayResult();
    switchScreen('test-screen', 'result-screen');
    
    // Reset transition flag
    isTransitioning = false;
}

function showLoadingAnimation() {
    const testScreen = document.getElementById('test-screen');
    const loadingHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <h3 class="loading-text">正在分析你的人格类型...</h3>
        </div>
    `;
    
    // Add loading styles
    const style = document.createElement('style');
    style.textContent = `
        .loading-container {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            z-index: 1000;
        }
        
        .loading-spinner {
            width: 60px;
            height: 60px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
            margin: 0 auto 20px;
        }
        
        .loading-text {
            color: white;
            font-size: 1.2rem;
            font-weight: 500;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    testScreen.innerHTML = loadingHTML;
}

function displayResult() {
    const typeData = mbtiTypes[mbtiResult];
    
    if (!typeData) {
        console.error('Invalid MBTI result:', mbtiResult);
        return;
    }
    
    // Update result display
    document.getElementById('result-badge').textContent = mbtiResult;
    document.getElementById('result-title').textContent = typeData.title;
    document.getElementById('result-subtitle').textContent = typeData.subtitle;
    
    // Update trait values
    document.getElementById('trait-energy').textContent = typeData.traits.energy;
    document.getElementById('trait-info').textContent = typeData.traits.info;
    document.getElementById('trait-decision').textContent = typeData.traits.decision;
    document.getElementById('trait-lifestyle').textContent = typeData.traits.lifestyle;
    
    // Update colors
    document.getElementById('result-badge').style.background = typeData.color;
}

function generateCard() {
    const typeData = mbtiTypes[mbtiResult];
    
    const cardHTML = `
        <div class="share-card" id="share-card">
            <div class="card-header" style="background: ${typeData.color};">
                <div class="card-type">${mbtiResult}</div>
                <div class="card-title">${typeData.title}</div>
            </div>
            
            <div class="card-body">
                <div class="card-description">${typeData.description}</div>
                
                <div class="card-keywords">
                    ${typeData.keywords.map(keyword => `<span class="keyword-tag">${keyword}</span>`).join('')}
                </div>
                
                <div class="card-traits">
                    <div class="trait-row">
                        <span class="trait-icon">⚡️</span>
                        <span class="trait-text">${typeData.traits.energy}</span>
                    </div>
                    <div class="trait-row">
                        <span class="trait-icon">🧠</span>
                        <span class="trait-text">${typeData.traits.info}</span>
                    </div>
                    <div class="trait-row">
                        <span class="trait-icon">💭</span>
                        <span class="trait-text">${typeData.traits.decision}</span>
                    </div>
                    <div class="trait-row">
                        <span class="trait-icon">🎯</span>
                        <span class="trait-text">${typeData.traits.lifestyle}</span>
                    </div>
                </div>
            </div>
            
        </div>
    `;
    
    // Add card styles
    const cardStyles = `
        <style>
            .share-card {
                width: 320px;
                height: 400px;
                background: white;
                border-radius: 24px;
                overflow: hidden;
                box-shadow: 0 24px 48px rgba(0, 0, 0, 0.15);
                font-family: 'Inter', sans-serif;
                position: relative;
                display: flex;
                flex-direction: column;
            }
            
            .card-header {
                padding: 40px 20px;
                text-align: center;
                color: white;
                position: relative;
                overflow: hidden;
            }
            
            .card-header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
            }
            
            .card-type {
                font-size: 3.5rem;
                font-weight: 800;
                margin-bottom: 10px;
                letter-spacing: 3px;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }
            
            .card-title {
                font-size: 1rem;
                font-weight: 500;
                opacity: 0.9;
            }
            
            .card-body {
                padding: 20px;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            
            .card-description {
                font-size: 0.9rem;
                line-height: 1.5;
                color: #333;
                margin-bottom: 15px;
            }
            
            .card-keywords {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
                margin-bottom: 15px;
            }
            
            .keyword-tag {
                background: #f0f0f0;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 0.7rem;
                color: #666;
                font-weight: 500;
            }
            
            .card-traits {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            
            .trait-row {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .trait-icon {
                font-size: 0.9rem;
            }
            
            .trait-text {
                font-size: 0.75rem;
                color: #666;
            }
            
            .card-footer {
                padding: 15px 20px;
                background: #f8f9fa;
                text-align: center;
                border-top: 1px solid #eee;
                margin-top: auto;
            }
            
            .card-logo {
                font-size: 0.8rem;
                font-weight: 600;
                color: #333;
                margin-bottom: 2px;
            }
            
            .card-website {
                font-size: 0.7rem;
                color: #888;
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', cardStyles);
    document.getElementById('card-preview').innerHTML = cardHTML;
    
    switchScreen('result-screen', 'card-screen');
}

function downloadCard() {
    // Use html2canvas to convert card to image
    if (typeof html2canvas !== 'undefined') {
        const card = document.getElementById('share-card');
        html2canvas(card, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
        }).then(canvas => {
            // Create download link
            const link = document.createElement('a');
            link.download = `mbti-${mbtiResult}-result.png`;
            link.href = canvas.toDataURL();
            link.click();
        });
    } else {
        // Fallback: show instruction to screenshot
        alert('请长按卡片进行截图保存，或右键保存图片');
    }
}

function retakeTest() {
    currentQuestion = 0;
    answers = [];
    mbtiResult = '';
    isTransitioning = false;
    
    // Reset test screen to original state
    location.reload();
}

function backToResult() {
    switchScreen('card-screen', 'result-screen');
}

function switchScreen(fromId, toId) {
    const fromScreen = document.getElementById(fromId);
    const toScreen = document.getElementById(toId);
    
    if (fromScreen && toScreen) {
        fromScreen.classList.remove('active');
        
        setTimeout(() => {
            toScreen.classList.add('active');
        }, 300);
    }
}

// ===== UTILITY FUNCTIONS =====

function addClickEffects() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('option-btn')) {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = e.offsetX + 'px';
            ripple.style.top = e.offsetY + 'px';
            ripple.style.width = ripple.style.height = '20px';
            ripple.style.marginLeft = ripple.style.marginTop = '-10px';
            
            e.target.style.position = 'relative';
            e.target.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
}

function addRippleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    addClickEffects();
    addRippleAnimation();
    
    // Initialize test immediately
    currentQuestion = 0;
    answers = [];
    isTransitioning = false;
    updateProgress();
    
    // Add event listeners to all option buttons
    document.addEventListener('click', function(e) {
        const optionBtn = e.target.closest('.option-btn');
        if (optionBtn) {
            const type = optionBtn.getAttribute('data-type');
            selectOption(currentQuestion, type, optionBtn);
        } else if (isTransitioning) {
            // Emergency reset mechanism - click anywhere else to force reset if stuck
            setTimeout(() => {
                isTransitioning = false;
            }, 1000);
        }
    });
    
    // Add html2canvas for card generation
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    document.head.appendChild(script);
});