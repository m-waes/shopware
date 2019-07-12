import { Component, Application } from 'src/core/shopware';
import template from './sw-theme-list-item.html.twig';
import './sw-theme-list-item.scss';

Component.register('sw-theme-list-item', {
    template,

    props: {
        theme: {
            type: Object,
            required: false,
            default: null
        }
    },

    computed: {
        previewMedia() {
            if (this.theme.previewMedia && this.theme.previewMedia.id && this.theme.previewMedia.url) {
                return {
                    'background-image': `url(${this.theme.previewMedia.url})`,
                    'background-size': 'cover'
                };
            }

            return {
                'background-image': this.defaultThemeAsset
            };
        },

        defaultThemeAsset() {
            const initContainer = Application.getContainer('init');
            const context = initContainer.contextService;

            return `url('${context.assetsPath}/administration/static/img/theme/default_theme_preview.jpg')`;
        },

        lockToolTip() {
            return {
                showDelay: 100,
                message: this.$tc('sw-theme-manager.general.lockedToolTip')
            };
        },
    },

    methods: {
        onChangePreviewImage(theme) {
            this.$emit('preview-image-change', theme);
        },

        onThemeClick() {
            this.$emit('item-click', this.theme);
        },

        onRemovePreviewImage(theme) {
            theme.previewMediaId = null;
            theme.save();
            theme.previewMedia = null;
        },

        onDelete(theme) {
            this.$emit('theme-delete', theme);
        }
    }
});
