
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Send the button role panel")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const panel = interaction.client.config.panel;

    if (!panel.roles || panel.roles.length !== 4) {
      return interaction.reply({
        content: "❌ Exactly 4 roles must be defined in config.json.",
        ephemeral: true
      });
    }

    const embed = new EmbedBuilder()
      .setTitle(panel.embed.title)
      .setDescription(panel.embed.description)
      .setColor(panel.embed.color)
      .setFooter({ text: panel.embed.footer });

    const row = new ActionRowBuilder();

    panel.roles.forEach((role, index) => {
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(`panel_role_${index}`)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      );
    });

    await interaction.reply({
      embeds: [embed],
      components: [row]
    });
  }
};
