<template>
    <div>
        <div v-for="(row, rowIndex) in field" :key="rowIndex" class="row">
            <span v-for="(item, colIndex) in row" :key="colIndex" class="object">
                {{ getObjectSymbol(item) }}
            </span>
        </div>
    </div>
</template>

<style>
.row {
    display: flex;
}

.object {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 1px solid black;
    text-align: center;
}
</style>
  
<script>
export default {
    data() {
        return {
            field: [],
        };
    },
    mounted() {
        this.loadField();
        window.addEventListener('keydown', this.handleKeyDown);
    },
    methods: {
        async loadField() {
            // 本来であればAPIを読み込む必要があるが、できるだけ広いフィールドで動作を確認したいので、APIを読み込まない
            this.field = [
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 2, 3, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 3, 0, 4, 1],
                [1, 1, 1, 1, 1],
            ];
        },
        getObjectSymbol(item) {
            switch (item) {
                case 0: return ' ';
                case 1: return '壁';
                case 2: return 'プレイヤー';
                case 3: return 'ブロック';
                case 4: return '出口';
                default: return '?';
            }
        },
        handleKeyDown(event) {
            switch (event.key) {
                case 'ArrowUp':
                    // 上に移動
                    this.movePlayer(0, -1);
                    break;
                case 'ArrowRight':
                    // 右に移動
                    this.movePlayer(1, 0);
                    break;
                case 'ArrowDown':
                    // 下に移動
                    this.movePlayer(0, 1);
                    break;
                case 'ArrowLeft':
                    // 左に移動
                    this.movePlayer(-1, 0);
                    break;
            }
        },
        movePlayer(dx, dy) {
            // プレイヤーの現在位置を見つける
            let playerPos = this.findPlayer();
            if (!playerPos) return;

            let newPosX = playerPos.x + dx;
            let newPosY = playerPos.y + dy;

            // 新しい位置がフィールド内で、壁や障害物でないことを確認
            if (this.isMovable(newPosX, newPosY)) {
                // プレイヤーを新しい位置に移動
                this.field[playerPos.y][playerPos.x] = 0;
                this.field[newPosY][newPosX] = 2;
            }
        },
        isMovable(x, y) {
            return (
                y >= 0 &&
                y < this.field.length &&
                x >= 0 &&
                x < this.field[y].length &&
                this.field[y][x] !== 1 &&  // 壁でないことを確認
                this.field[y][x] !== 3     // 移動可能ブロックでないことを確認
            );
        },
        findPlayer() {
            for (let y = 0; y < this.field.length; y++) {
                for (let x = 0; x < this.field[y].length; x++) {
                    if (this.field[y][x] === 2) {
                        return { x, y };
                    }
                }
            }
            return null;
        },
    },
};
</script>
