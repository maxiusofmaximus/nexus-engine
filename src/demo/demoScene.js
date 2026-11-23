/**
 * Escena demo de Nexus Engine sobre el lienzo de CustomEngine.
 * Solo usa la API del motor (scene, go, add, input, config, deltaTime). Sin red.
 */
export function startDemo(game) {
    const W = game.config.width;
    const H = game.config.height;
    const HALF = 20;      // mitad del cuadrado de 40px
    const SPEED = 240;    // px/s
    let fps = 0, acc = 0, frames = 0;

    // Evita teclas "pegadas" si la ventana pierde el foco antes de recibir keyup
    window.addEventListener('blur', () => game.input.keys.clear());

    game.scene('demo', () => {
        // Fondo con cuadrícula suave
        game.add([{
            type: 'fondo',
            render(ctx) {
                ctx.fillStyle = '#2d3748';
                ctx.fillRect(0, 0, W, H);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                for (let x = 0; x <= W; x += 40) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, H); }
                for (let y = 0; y <= H; y += 40) { ctx.moveTo(0, y + 0.5); ctx.lineTo(W, y + 0.5); }
                ctx.stroke();
            }
        }]);

        // Título y subtítulo
        game.add([{
            type: 'texto',
            render(ctx) {
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#e2e8f0';
                ctx.font = 'bold 36px system-ui, sans-serif';
                ctx.fillText('Nexus Engine', W / 2, 60);
                ctx.fillStyle = '#a0aec0';
                ctx.font = '16px system-ui, sans-serif';
                ctx.fillText('Flechas o WASD para mover · Motor Propio (offline)', W / 2, 98);
            }
        }]);

        // Cuadrado controlable, limitado al lienzo
        const player = game.add([
            window.rect(2 * HALF, 2 * HALF, '#4ecdc4'),
            {
                type: 'mover',
                update(dt) {
                    const k = game.input;
                    let dx = 0, dy = 0;
                    if (k.isKeyPressed('ArrowLeft') || k.isKeyPressed('KeyA')) dx -= 1;
                    if (k.isKeyPressed('ArrowRight') || k.isKeyPressed('KeyD')) dx += 1;
                    if (k.isKeyPressed('ArrowUp') || k.isKeyPressed('KeyW')) dy -= 1;
                    if (k.isKeyPressed('ArrowDown') || k.isKeyPressed('KeyS')) dy += 1;
                    const len = Math.hypot(dx, dy) || 1;
                    const step = SPEED * Math.min(dt, 0.05); // dt acotado: sin saltos tras pausas
                    player.pos.x = Math.min(W - HALF, Math.max(HALF, player.pos.x + (dx / len) * step));
                    player.pos.y = Math.min(H - HALF, Math.max(HALF, player.pos.y + (dy / len) * step));
                }
            }
        ]);
        player.pos.x = W / 2;
        player.pos.y = H / 2 + 40;

        // Contador de FPS (media de 0,5 s), abajo a la izquierda
        game.add([{
            type: 'fps',
            update(dt) {
                acc += dt;
                frames++;
                if (acc >= 0.5) { fps = Math.round(frames / acc); acc = 0; frames = 0; }
            },
            render(ctx) {
                ctx.textAlign = 'left';
                ctx.textBaseline = 'bottom';
                ctx.fillStyle = '#a0aec0';
                ctx.font = '12px monospace';
                ctx.fillText(`FPS: ${fps}`, 10, H - 10);
            }
        }]);
    });

    game.go('demo');
    console.log('Demo cargada');
}
