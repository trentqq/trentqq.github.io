// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    // 轮播图初始化
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    
    // 显示指定幻灯片
    function showSlide(index) {
        // 隐藏所有幻灯片
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // 更新指示器
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // 显示当前幻灯片
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }
    
    // 下一张幻灯片
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    // 上一张幻灯片
    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // 添加事件监听器
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // 为指示器添加点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // 自动轮播
    let autoPlay = setInterval(nextSlide, 5000);
    
    // 鼠标悬停时暂停自动轮播
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoPlay);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoPlay = setInterval(nextSlide, 5000);
    });
    
    // 图像对比功能
    const comparisonContainer = document.querySelector('.comparison-container');
    const slider = document.querySelector('.comparison-slider');
    const afterImage = document.querySelector('.image-after');
    let isResizing = false;
    
    // 开始调整
    function startResize(e) {
        isResizing = true;
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
        e.preventDefault();
    }
    
    // 调整大小
    function resize(e) {
        if (!isResizing) return;
        
        const containerRect = comparisonContainer.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerLeft = containerRect.left;
        
        let x = e.clientX - containerLeft;
        
        // 限制在容器范围内
        x = Math.max(0, Math.min(x, containerWidth));
        
        // 更新滑块位置和图像宽度
        const percentage = (x / containerWidth) * 100;
        slider.style.left = `${percentage}%`;
        afterImage.style.width = `${percentage}%`;
    }
    
    // 停止调整
    function stopResize() {
        isResizing = false;
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
    }
    
    // 添加事件监听器
    slider.addEventListener('mousedown', startResize);
    
    // 触摸事件支持
    slider.addEventListener('touchstart', function(e) {
        isResizing = true;
        document.addEventListener('touchmove', touchResize);
        document.addEventListener('touchend', stopResize);
        e.preventDefault();
    });
    
    function touchResize(e) {
        if (!isResizing) return;
        
        const containerRect = comparisonContainer.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerLeft = containerRect.left;
        
        let x = e.touches[0].clientX - containerLeft;
        
        // 限制在容器范围内
        x = Math.max(0, Math.min(x, containerWidth));
        
        // 更新滑块位置和图像宽度
        const percentage = (x / containerWidth) * 100;
        slider.style.left = `${percentage}%`;
        afterImage.style.width = `${percentage}%`;
    }
});