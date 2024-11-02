<template>
    <div class="field">
        <div v-for="(row, rowIndex) in field" :key="rowIndex" class="row">
            <div v-for="(item, colIndex) in row" :key="colIndex" class="object">
                <div v-if="item == 0">
                    <!-- 障害物なし -->
                    <img src="https://gorin2024-material.s3.ap-northeast-1.amazonaws.com/parquet.png" alt="">
                </div>
                <div v-if="item == 1">
                    <!-- 壁 -->
                    <img src="https://gorin2024-material.s3.ap-northeast-1.amazonaws.com/paving.png" alt="壁">
                </div>
                <div v-if="item == 2">
                    <!-- プレイヤー -->
                    <img src="https://gorin2024-material.s3.ap-northeast-1.amazonaws.com/walking.png" alt="プレイヤー">
                </div>
                <div v-if="item == 3">
                    <!-- ブロック -->
                    <img src="https://gorin2024-material.s3.ap-northeast-1.amazonaws.com/block.png" alt="ブロック">
                </div>
                <div v-if="item == 4">
                    <!-- フラッグ -->
                    <img src="https://gorin2024-material.s3.ap-northeast-1.amazonaws.com/flag.png" alt="フラッグ">
                </div>

            </div>
        </div>
    </div>
</template>

<style>
.field {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    background-color: white;
}

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

.object img {
    width: 100%;
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
            let token = sessionStorage.getItem('token');
            // BearerトークンでAPIに接続
            let response = await fetch('http://localhost:8085/api/fields?level=1', {
                headers: { Authorization: `Bearer ${token}` },
            });
            let data = await response.json();
            this.field = data.objects;
        },
        handleKeyDown(event) {
            // このコードを短くしたい
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
