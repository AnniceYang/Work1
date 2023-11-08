<template>
    <el-dialog :title="$t('common.edit')" :close-on-click-modal="false" :visible.sync="visible" :destroy-on-close="true" width="820px">
        <el-row :gutter="20">
            <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="200px">
                <el-form-item :label="$t('modelManage.modeName')" prop="name">
                    <el-input v-model="dataForm.name" :placeholder="$t('common.inputPrompt')" />
                </el-form-item>
                <el-form-item :label="$t('modelManage.modeEncoding')" prop="code">
                    <el-input v-model="dataForm.code" :placeholder="$t('common.inputPrompt')" />
                </el-form-item>
                <template v-if="dataForm.code == 5">
                    <el-col :span="12">
                        <el-form-item :label="$t('modelManage.chargingSwitch')" prop="chargeSwitch">
                            <el-radio-group v-model="dataForm.chargeSwitch">
                                <el-radio :label="1">{{ $t("common.enable") }}</el-radio>
                                <el-radio :label="0">{{ $t("common.disable") }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('modelManage.socOfChargeUp')" prop="chargeCutOff">
                            <el-input v-model="dataForm.chargeCutOff" :placeholder="$t('common.inputPrompt')">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item :label="$t('modelManage.timePeriodOfCharging')">
                            <el-row v-for="(item, index) in dataForm.chargeTimeQuantum" :key="index" style="margin-bottom: 10px">
                                <el-time-picker
                                    style="width: 200px"
                                    format="HH:mm"
                                    value-format="HH:mm"
                                    :placeholder="$t('common.startingTime')"
                                    v-model="item.start"
                                />
                                <el-time-picker
                                    style="width: 200px; margin-left: 10px"
                                    format="HH:mm"
                                    value-format="HH:mm"
                                    :placeholder="$t('common.endTime')"
                                    v-model="item.end"
                                />
                                <el-button
                                    @click="addChargeTime()"
                                    style="margin-left: 10px"
                                    type="primary"
                                    icon="el-icon-plus"
                                    circle
                                    v-if="index === 0"
                                />
                                <el-button
                                    @click="delChargeTime(index)"
                                    style="margin-left: 10px"
                                    type="danger"
                                    icon="el-icon-delete"
                                    circle
                                    v-else
                                />
                            </el-row>
                            <!-- <el-tag size="small" type="danger">时间段必须全天范围(00:00~23:59)</el-tag> -->
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item :label="$t('modelManage.electricitySellingSwitch')" prop="dischargeSwitch">
                            <el-radio-group v-model="dataForm.dischargeSwitch">
                                <el-radio :label="1">{{ $t("common.enable") }}</el-radio>
                                <el-radio :label="0">{{ $t("common.disable") }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('modelManage.socOfSellElectricity')" prop="dischargeCutOff">
                            <el-input v-model="dataForm.dischargeCutOff" type="Number" placeholder="请输入">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item :label="$t('modelManage.timePeriodOfElectricitySales')">
                            <el-row v-for="(item, index) in dataForm.dischargeTimeQuantum" :key="index" style="margin-bottom: 10px">
                                <el-time-picker
                                    style="width: 200px"
                                    format="HH:mm"
                                    value-format="HH:mm"
                                    :placeholder="$t('common.startingTime')"
                                    v-model="item.start"
                                />
                                <el-time-picker
                                    style="width: 200px; margin-left: 10px"
                                    format="HH:mm"
                                    value-format="HH:mm"
                                    :placeholder="$t('common.endTime')"
                                    v-model="item.end"
                                />
                                <el-button
                                    @click="addDischargeTime()"
                                    style="margin-left: 10px"
                                    type="primary"
                                    icon="el-icon-plus"
                                    circle
                                    v-if="index === 0"
                                />
                                <el-button
                                    @click="delDischargeTime(index)"
                                    style="margin-left: 10px"
                                    type="danger"
                                    icon="el-icon-delete"
                                    circle
                                    v-else
                                />
                            </el-row>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item :label="$t('modelManage.dischargeSwitch')" prop="releaseSwitch">
                            <el-radio-group v-model="dataForm.releaseSwitch">
                                <el-radio :label="1">{{ $t("common.enable") }}</el-radio>
                                <el-radio :label="0">{{ $t("common.disable") }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('modelManage.socOfDischargingOff')" prop="releaseCutOff">
                            <el-input v-model="dataForm.releaseCutOff" type="Number" placeholder="请输入">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item :label="$t('modelManage.timePeriodOfDischarging')">
                            <el-row v-for="(item, index) in dataForm.releaseTimeQuantum" :key="index" style="margin-bottom: 10px">
                                <el-time-picker
                                    style="width: 200px"
                                    format="HH:mm"
                                    value-format="HH:mm"
                                    :placeholder="$t('common.startingTime')"
                                    v-model="item.start"
                                />
                                <el-time-picker
                                    style="width: 200px; margin-left: 10px"
                                    format="HH:mm"
                                    value-format="HH:mm"
                                    :placeholder="$t('common.endTime')"
                                    v-model="item.end"
                                />
                                <el-button
                                    @click="addReleaseTime()"
                                    style="margin-left: 10px"
                                    type="primary"
                                    icon="el-icon-plus"
                                    circle
                                    v-if="index === 0"
                                />
                                <el-button
                                    @click="delReleaseTime(index)"
                                    style="margin-left: 10px"
                                    type="danger"
                                    icon="el-icon-delete"
                                    circle
                                    v-else
                                />
                            </el-row>
                        </el-form-item>
                    </el-col>
                </template>

                <el-col :span="24">
                    <el-form-item :label="$t('modelManage.state')" prop="status">
                        <el-radio-group v-model="dataForm.status">
                            <el-radio :label="0">{{ $t("modelManage.normal") }}</el-radio>
                            <el-radio :label="1">{{ $t("modelManage.toBeOpened") }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item :label="$t('modelManage.modeDescription')" prop="explanation">
                        <el-input v-model="dataForm.explanation" type="textarea" :rows="2" :placeholder="$t('common.inputPrompt')" />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item :label="$t('modelManage.sort')" prop="sort">
                        <el-input v-model="dataForm.sort" type="Number" :placeholder="$t('common.inputPrompt')" />
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>

        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">{{ $t("common.cancel") }}</el-button>
            <el-button type="primary" :loading="loadingState" @click="handleSubmit()">{{ $t("common.confirm") }}</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { addModel, editModel, qryModelInfo } from "@/api/model";
export default {
    data() {
        return {
            visible: false,
            loadingState: false,
            dataForm: {},
            dataRule: {
                code: [{ required: true, message: this.$t('modelManage.validateE'), trigger: "blur" }],
                name: [{ required: true, message: this.$t('modelManage.validateN'), trigger: "blur" }],

                chargeCutOff: [{ required: true, message: this.$t('modelManage.validateC'), trigger: "blur" }],
                dischargeCutOff: [{ required: true, message: this.$t('modelManage.validateEl'), trigger: "blur" }],
                releaseCutOff: [{ required: true, message: this.$t('modelManage.validateD'), trigger: "blur" }],

                explanation: [{ required: true, message: this.$t('modelManage.validateDe'), trigger: "blur" }],
                chargeSwitch: [{ required: true, message: "", trigger: "blur" }],
                dischargeSwitch: [{ required: true, message: "", trigger: "blur" }],
                releaseSwitch: [{ required: true, message: "", trigger: "blur" }],
            },
        };
    },
    methods: {
        init(id) {
            this.dataForm = {
                chargeCutOff: null,
                dischargeCutOff: null,
                chargeTimeQuantum: [{ start: "00:00", end: "", sort: 1 }],
                dischargeTimeQuantum: [{ start: "00:00", end: "", sort: 1 }],
                releaseTimeQuantum: [{ start: "00:00", end: "", sort: 1 }],
                explanation: "",
                name: "",
                code: "",
                sort: 0,
                status: 0,
                chargeSwitch: 0,
                dischargeSwitch: 0,
                releaseSwitch: 0,
                releaseCutOff: null,
            };
            if (id) {
                qryModelInfo({ id }).then((res) => {
                    for (const key in res) {
                        this.dataForm[key] = res[key];
                    }
                    this.dataForm.id = res.id;
                    if (res.chargeTimeQuantum.length > 0) {
                        this.dataForm.chargeTimeQuantum = res.chargeTimeQuantum.map((item) => {
                            item.start = this.minToTime(item.start);
                            item.end = this.minToTime(item.end);
                            return item;
                        });
                    } else {
                        this.dataForm.chargeTimeQuantum = [{ start: "00:00", end: "", sort: 1 }];
                    }
                    if (res.dischargeTimeQuantum.length > 0) {
                        this.dataForm.dischargeTimeQuantum = res.dischargeTimeQuantum.map((item) => {
                            item.start = this.minToTime(item.start);
                            item.end = this.minToTime(item.end);
                            return item;
                        });
                    } else {
                        this.dataForm.dischargeTimeQuantum = [{ start: "00:00", end: "", sort: 1 }];
                    }
                    if (res.releaseTimeQuantum.length > 0) {
                        this.dataForm.releaseTimeQuantum = res.releaseTimeQuantum.map((item) => {
                            item.start = this.minToTime(item.start);
                            item.end = this.minToTime(item.end);
                            return item;
                        });
                    } else {
                        this.dataForm.releaseTimeQuantum = [{ start: "00:00", end: "", sort: 1 }];
                    }
                });
            }
            console.log("this.dataForm", this.dataForm);
            this.visible = true;
            this.$nextTick(() => {
                this.$refs.dataForm.clearValidate();
            });
        },
        handleSubmit() {
            console.log("this.dataForm", this.dataForm);
            this.$refs.dataForm.validate((valid) => {
                if (valid) {
                    this.loadingState = true;
                    let info = JSON.parse(JSON.stringify(this.dataForm));
                    if (this.dataForm.code == 5) {
                        info.chargeTimeQuantum = info.chargeTimeQuantum.map((item) => {
                            item.start = this.timeToMin(item.start);
                            item.end = this.timeToMin(item.end);
                            return item;
                        });
                        info.dischargeTimeQuantum = info.dischargeTimeQuantum.map((item) => {
                            item.start = this.timeToMin(item.start);
                            item.end = this.timeToMin(item.end);
                            return item;
                        });
                        info.releaseTimeQuantum = info.releaseTimeQuantum.map((item) => {
                            item.start = this.timeToMin(item.start);
                            item.end = this.timeToMin(item.end);
                            return item;
                        });
                        if (
                            info.chargeTimeQuantum[0].start != 0 ||
                            info.chargeTimeQuantum[info.chargeTimeQuantum.length - 1].end != 1439 ||
                            info.dischargeTimeQuantum[0].start != 0 ||
                            info.dischargeTimeQuantum[info.dischargeTimeQuantum.length - 1].end != 1439
                        ) {
                            return this.$message.warning(this.$t('modelManage.prompt'));
                        }
                    } else {
                        info.chargeTimeQuantum = [];
                        info.dischargeTimeQuantum = [];
                        info.releaseTimeQuantum = [];
                    }
                    console.log("info", info);
                    if (this.dataForm.id) {
                        editModel(info)
                            .then((res) => {
                                this.$message.success(this.$t("common.successfulModification"));
                                this.visible = false;
                                this.$emit("back");
                            })
                            .finally(() => {
                                this.loadingState = false;
                            });
                    } else {
                        addModel(info)
                            .then((res) => {
                                this.$message.success(this.$t("common.addedSuccessfully"));
                                this.visible = false;
                                this.$emit("back");
                            })
                            .finally(() => {
                                this.loadingState = false;
                            });
                    }
                }
            });
        },
        addChargeTime() {
            const lastData = this.dataForm.chargeTimeQuantum[this.dataForm.chargeTimeQuantum.length - 1];
            const sort = lastData.sort + 1;
            let startTime = "";
            if (lastData.end) {
                startTime = this.minToTime(this.timeToMin(lastData.end) + 1);
            }
            this.dataForm.chargeTimeQuantum.push({ start: startTime, end: "", sort: sort });
        },
        delChargeTime(index) {
            this.dataForm.chargeTimeQuantum.splice(index, 1);
        },
        addDischargeTime() {
            const lastData = this.dataForm.dischargeTimeQuantum[this.dataForm.dischargeTimeQuantum.length - 1];
            const sort = lastData.sort + 1;
            let startTime = "";
            if (lastData.end) {
                startTime = this.minToTime(this.timeToMin(lastData.end) + 1);
            }
            this.dataForm.dischargeTimeQuantum.push({ start: startTime, end: "", sort: sort });
        },
        delDischargeTime(index) {
            this.dataForm.dischargeTimeQuantum.splice(index, 1);
        },
        addReleaseTime() {
            const lastData = this.dataForm.releaseTimeQuantum[this.dataForm.releaseTimeQuantum.length - 1];
            const sort = lastData.sort + 1;
            let startTime = "";
            if (lastData.end) {
                startTime = this.minToTime(this.timeToMin(lastData.end) + 1);
            }
            this.dataForm.releaseTimeQuantum.push({ start: startTime, end: "", sort: sort });
        },
        delReleaseTime(index) {
            this.dataForm.releaseTimeQuantum.splice(index, 1);
        },
        // 时间转分钟
        timeToMin(time) {
            if (time) {
                let arr = time.split(":");
                return arr[0] * 60 + arr[1] * 1;
            } else {
                return 0;
            }
        },
        // 分钟转时间
        minToTime(min) {
            return min ? Math.floor(min / 60) + ":" + (min % 60) : "00:00";
        },
    },
};
</script>

<style lang="scss" scoped>
.btn {
    display: flex;
    justify-content: center;
}
</style>
